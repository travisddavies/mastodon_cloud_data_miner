from mpi4py import MPI
import os
import warnings
import json
import couchdb
from dateutil.parser import parse

# changing format and supressing warning if any
warnings.simplefilter(action="ignore", category=FutureWarning)
print("Reading file")
# path of the Twitter file
twitter_file_path = "twitterhuge.json"

couch = couchdb.Server("http://admin:password@172.26.132.152:8080")
db_name = "twitter"
if db_name in couch:
    db = couch[db_name]

# Map location details
with open("au.json") as f:
    au_loc = json.load(f)

au_loc = {x["city"].lower(): {"admin_name": x["admin_name"].lower()} for x in au_loc}

aus_state = [
    "australian capital territory",
    "new south wales",
    "northern territory",
    "queensland",
    "south australia",
    "tasmania",
    "victoria",
    "western australia",
]


def map_loc(string):
    dict = {"suburb": None, "city": None, "state": None}
    location = string.lower().split(",")
    location = [x.strip() for x in location]
    if len(location) == 2:
        if location[1] == "australia" and location[0] in au_loc.keys():
            dict["city"] = location[0]
            dict["state"] = au_loc[location[0]]["admin_name"]
        if location[0] in aus_state:
            dict["state"] = location[0]
        if location[1] in aus_state:
            dict["state"] = location[1]
            dict["city"] = location[0]
        if location[1] in au_loc.keys():
            dict["suburb"] = location[0]
            dict["city"] = location[1]
            dict["state"] = au_loc[location[1]]["admin_name"]
    return dict


# chuncking and batching large twitter file to upload to couchdb
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
                ) and (
                    "data" in single_tweet["doc"]
                    and "lang" in single_tweet["doc"]["data"]
                    and single_tweet["doc"]["data"]["lang"] == "en"
                ):
                    location = map_loc(
                        single_tweet["doc"]["includes"]["places"][0]["full_name"]
                        if "full_name" in single_tweet["doc"]["includes"]["places"][0]
                        else None
                    )
                    print(location)
                    if location["state"] != None:
                        print(single_tweet["id"])
                        data = {
                            # id
                            "_id": single_tweet["id"],
                            # tags
                            "tags": single_tweet["value"]["tags"]
                            if "value" in single_tweet
                            and "tags" in single_tweet["value"]
                            else None,
                            # tokens
                            "tokens": single_tweet["value"]["tokens"]
                            if "value" in single_tweet
                            and "tokens" in single_tweet["value"]
                            else None,
                            # author_id
                            "author_id": single_tweet["doc"]["data"]["author_id"]
                            if "author_id" in single_tweet["doc"]["data"]
                            else None,
                            # domain name
                            "domain_name": single_tweet["doc"]["data"][
                                "context_annotations"
                            ][0]["domain"]["name"]
                            if "context_annotations" in single_tweet["doc"]["data"]
                            and "domain"
                            in single_tweet["doc"]["data"]["context_annotations"][0]
                            and "name"
                            in single_tweet["doc"]["data"]["context_annotations"][0][
                                "domain"
                            ]
                            else None,
                            # description
                            "description": single_tweet["doc"]["data"][
                                "context_annotations"
                            ][0]["domain"]["description"]
                            if "context_annotations" in single_tweet["doc"]["data"]
                            and "domain"
                            in single_tweet["doc"]["data"]["context_annotations"][0]
                            and "description"
                            in single_tweet["doc"]["data"]["context_annotations"][0][
                                "domain"
                            ]
                            else None,
                            # hashtags
                            "hashtags": [
                                hashtag["tag"]
                                for hashtag in single_tweet["doc"]["data"]["entities"][
                                    "hashtags"
                                ]
                            ]
                            if "entities" in single_tweet["doc"]["data"]
                            and "hashtags" in single_tweet["doc"]["data"]["entities"]
                            else [],
                            # sentiment
                            "sentiment": single_tweet["doc"]["data"]["sentiment"]
                            if "sentiment" in single_tweet["doc"]["data"]
                            else None,
                            # matching rule tag
                            "matching_rule_tag": single_tweet["doc"]["matching_rules"][
                                "tag"
                            ]
                            if "matching_rules" in single_tweet["doc"]
                            and "tag" in single_tweet["doc"]["matching_rules"]
                            else None,
                            # place name
                            "place_name": location,
                            # text
                            "text": single_tweet["doc"]["data"]["text"]
                            if "text" in single_tweet["doc"]["data"]
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
