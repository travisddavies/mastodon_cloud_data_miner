from mpi4py import MPI
import os
import warnings
import json
import couchdb

# changing format and supressing warning if any
warnings.simplefilter(action="ignore", category=FutureWarning)
print("Reading file")

# path of the Twitter file
twitter_file_path = "twitterhuge.json"

# CouchDB connection details
couchdb_server = "http://admin:password@172.26.132.147:5984"

# Connect to CouchDB
couch = couchdb.Server(couchdb_server)

# Create or access a CouchDB database
db_name = "twitter"
if db_name in couch:
    db = couch[db_name]
else:
    db = couch.create(db_name)


def node_process(twitter_file_path, c_start, c_end, b_size):
    batches = []
    # dividing the chunks to batches
    with open(twitter_file_path, "rb") as f:
        b_end = c_start
        while b_end < c_end:
            b_start = b_end
            # print(b_start)
            f.seek(b_start + b_size)
            f.readline()
            b_end = f.tell()
            if b_end > c_end:
                b_end = c_end
            batches.append([b_start, b_end - b_start])

    # reading the lines from batches
    with open(twitter_file_path, "rb") as f:
        for batch in batches:
            data_list = []
            f.seek(batch[0])
            lines = f.read(batch[1]).splitlines()
            for line in lines:
                line = line.decode("utf-8")
                try:
                    if line[-1] == ",":
                        single_tweet = json.loads(line[:-1])
                    else:
                        single_tweet = json.loads(line)
                except json.JSONDecodeError:
                    continue
                if (
                    "doc" in single_tweet
                    and "includes" in single_tweet["doc"]
                    and "places" in single_tweet["doc"]["includes"]
                    and len(single_tweet["doc"]["includes"]["places"]) > 0
                ):
                    print(single_tweet["id"])
                    data = {
                        "_id": single_tweet["id"],
                        "tags": single_tweet["value"]["tags"]
                        if "value" in single_tweet and "tags" in single_tweet["value"]
                        else None,
                        "tokens": single_tweet["value"]["tokens"]
                        if "value" in single_tweet and "tokens" in single_tweet["value"]
                        else None,
                        "author_id": single_tweet["doc"]["data"]["author_id"]
                        if "doc" in single_tweet
                        and "data" in single_tweet["doc"]
                        and "author_id" in single_tweet["doc"]["data"]
                        else None,
                        "domain_name": single_tweet["doc"]["data"][
                            "context_annotations"
                        ][0]["domain"]["name"]
                        if "doc" in single_tweet
                        and "data" in single_tweet["doc"]
                        and "context_annotations" in single_tweet["doc"]["data"]
                        and "domain"
                        in single_tweet["doc"]["data"]["context_annotations"][0]
                        and "name"
                        in single_tweet["doc"]["data"]["context_annotations"][0][
                            "domain"
                        ]
                        else None,
                        "description": single_tweet["doc"]["data"][
                            "context_annotations"
                        ][0]["domain"]["description"]
                        if "doc" in single_tweet
                        and "data" in single_tweet["doc"]
                        and "context_annotations" in single_tweet["doc"]["data"]
                        and "domain"
                        in single_tweet["doc"]["data"]["context_annotations"][0]
                        and "description"
                        in single_tweet["doc"]["data"]["context_annotations"][0][
                            "domain"
                        ]
                        else None,
                        "hashtags": [
                            hashtag["tag"]
                            for hashtag in single_tweet["doc"]["data"]["entities"][
                                "hashtags"
                            ]
                        ]
                        if "doc" in single_tweet
                        and "data" in single_tweet["doc"]
                        and "entities" in single_tweet["doc"]["data"]
                        and "hashtags" in single_tweet["doc"]["data"]["entities"]
                        else [],
                        "lang": single_tweet["doc"]["data"]["lang"]
                        if "doc" in single_tweet
                        and "data" in single_tweet["doc"]
                        and "lang" in single_tweet["doc"]["data"]
                        else None,
                        "text": single_tweet["doc"]["data"]["text"]
                        if "doc" in single_tweet
                        and "data" in single_tweet["doc"]
                        and "text" in single_tweet["doc"]["data"]
                        else None,
                        "sentiment": single_tweet["doc"]["data"]["sentiment"]
                        if "doc" in single_tweet
                        and "data" in single_tweet["doc"]
                        and "sentiment" in single_tweet["doc"]["data"]
                        else None,
                        "matching_rule_tag": single_tweet["doc"]["matching_rules"][
                            "tag"
                        ]
                        if "doc" in single_tweet
                        and "matching_rules" in single_tweet["doc"]
                        and "tag" in single_tweet["doc"]["matching_rules"]
                        else None,
                        "place_name": single_tweet["doc"]["includes"]["places"][0][
                            "full_name"
                        ]
                        if "doc" in single_tweet
                        and "includes" in single_tweet["doc"]
                        and "places" in single_tweet["doc"]["includes"]
                        and len(single_tweet["doc"]["includes"]["places"]) > 0
                        else None,
                    }
                    data_list.append(data)
            db.update(data_list)
    return


print("Declaring MPI variables")
# Declaring MPI variables
comm = MPI.COMM_WORLD
rank = comm.Get_rank()
size = comm.size

print("Master Node")
# Master node will scatter chunk size and chunk start position to all the nodes
if rank == 0:
    total_size = os.path.getsize(twitter_file_path)
    c_size = int(total_size / size)
    chunks = []
    with open(twitter_file_path, "rb") as f:
        c_start = 0
        while True:
            f.seek(c_start + c_size)
            line = f.readline()  # read until newline character
            if not line:
                # end of file
                chunks.append((c_start, f.tell()))
                break
            else:
                pos = f.tell()
                c_end = pos
                chunks.append([c_start, c_end])
                c_start = c_end
else:
    chunks = None

comm.Barrier()

# scatter all chunk information
chunk_node = comm.scatter(chunks, root=0)

res = node_process(twitter_file_path, chunk_node[0], chunk_node[1], 10000000)
