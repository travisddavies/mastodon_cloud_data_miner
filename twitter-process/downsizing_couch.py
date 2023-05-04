from mpi4py import MPI
import os
import warnings
import json
import couchdb
import requests
import time
import datetime

#changing format and supressing warning if any
warnings.simplefilter(action='ignore', category=FutureWarning)
print("Reading file")
#reading the Twitter file
twitter_file_path='/home/ubuntu/data/twitterhuge.json'

def node_process(twitter_file_path,c_start,c_end,b_size):
    total_data_number = 0
    #initating 3 output files as dictionaries
    print("Start dividing the chunks to batches")
    batches=[]
    #dividing the chunks to batches
    with open(twitter_file_path, 'rb') as f:
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
            # print("add batched")
        print("Finish dividing")

    #reading the lines from batches
    with open(twitter_file_path, 'rb') as f:

        for batch in batches:
            f.seek(batch[0])
            lines = f.read(batch[1]).splitlines()
            for line in lines:
                line = line.decode('utf-8')
                try:
                    if line[-1]==',':
                        single_tweet = json.loads(line[:-1])
                    else:
                        single_tweet = json.loads(line)
                except json.JSONDecodeError:
                    continue
                if 'doc' in single_tweet and 'includes' in single_tweet['doc'] and 'places' in single_tweet['doc']['includes'] and len(single_tweet['doc']['includes']['places']) > 0:
                    # print(single_tweet['id'])
                    data = {
                        '_id': single_tweet['id'],
                        # '_rev': single_tweet['id'],
                        'tags': single_tweet['value']['tags'] if 'value' in single_tweet and 'tags' in single_tweet['value'] else None,
                        'tokens': single_tweet['value']['tokens'] if 'value' in single_tweet and 'tokens' in single_tweet['value'] else None,
                        'author_id': single_tweet['doc']['data']['author_id'] if 'doc' in single_tweet and 'data' in single_tweet['doc'] and 'author_id' in single_tweet['doc']['data'] else None,
                        'domain_name': single_tweet['doc']['data']['context_annotations'][0]['domain']['name'] if 'doc' in single_tweet and 'data' in single_tweet['doc'] and 'context_annotations' in single_tweet['doc']['data'] and 'domain' in single_tweet['doc']['data']['context_annotations'][0] and 'name' in single_tweet['doc']['data']['context_annotations'][0]['domain'] else None,
                        'description': single_tweet['doc']['data']['context_annotations'][0]['domain']['description'] if 'doc' in single_tweet and 'data' in single_tweet['doc'] and 'context_annotations' in single_tweet['doc']['data'] and 'domain' in  single_tweet['doc']['data']['context_annotations'][0] and 'description' in single_tweet['doc']['data']['context_annotations'][0]['domain'] else None,
                        'hashtags': [hashtag['tag'] for hashtag in single_tweet['doc']['data']['entities']['hashtags']] if 'doc' in single_tweet and 'data' in single_tweet['doc'] and 'entities' in single_tweet['doc']['data'] and 'hashtags' in single_tweet['doc']['data']['entities'] else [],
                        'lang': single_tweet['doc']['data']['lang'] if 'doc' in single_tweet and 'data' in single_tweet['doc'] and 'lang' in single_tweet['doc']['data'] else None,
                        'text': single_tweet['doc']['data']['text'] if 'doc' in single_tweet and 'data' in single_tweet['doc'] and 'text' in single_tweet['doc']['data'] else None,
                        'sentiment': single_tweet['doc']['data']['sentiment'] if 'doc' in single_tweet and 'data' in single_tweet['doc'] and 'sentiment' in single_tweet['doc']['data'] else None,
                        'matching_rule_tag': single_tweet['doc']['matching_rules']['tag'] if 'doc' in single_tweet and 'matching_rules' in single_tweet['doc'] and 'tag' in single_tweet['doc']['matching_rules'] else None,
                        'place_name': single_tweet['doc']['includes']['places'][0]['full_name'] if 'doc' in single_tweet and 'includes' in single_tweet['doc'] and 'places' in single_tweet['doc']['includes'] and len(single_tweet['doc']['includes']['places']) > 0 else None
                    }
                    try:
                        db.save(data)

                        total_data_number = total_data_number + 1
                        if (total_data_number % 500000 == 0):
                            with open('log.txt', 'w') as f:
                                dt_object = datetime.datetime.fromtimestamp(time.time())
                                total_data_number + " tweets sent to database at " + str(dt_object)

                    except couchdb.ResourceConflict:
                        pass
                    # url = 'http://admin:password@172.26.132.147:5984/twitter/' + str(id)
                    # response = requests.head(url)
                    # if response.status_code == 200:
                    #   # the document exists
                    #   print("The data already exists.")
                    # else:
                    #   db.save(data)

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
    with open(twitter_file_path, 'rb') as f:
        c_start = 0
        while True:
            f.seek(c_start + c_size)
            line = f.readline()  # read until newline character
            if not line:
                # end of file
                chunks.append((c_start, f.tell()))
                break
            else:
                pos=f.tell()
                c_end = pos
                chunks.append([c_start, c_end])
                c_start = c_end
else:
    chunks = None
comm.Barrier()

#scatter all chunk information
chunk_node = comm.scatter(chunks, root=0)

# CouchDB connection details
couchdb_server = 'http://admin:password@172.26.132.147:5984'

# Connect to CouchDB
couch = couchdb.Server(couchdb_server)

# Create or access a CouchDB database
db_name = 'twitter'
db = couch[db_name]
# if db_name in couch:
#     db = couch[db_name]
# else:
#     db = couch.create(db_name)

print("processing line by line")
#以下不需要了
#call node process function to produce node results
res=node_process(twitter_file_path,chunk_node[0],chunk_node[1],10000000)

#print("Start Gathering")
#Gathring all variables at root node
#res = comm.gather(res, root = 0)

# print("Start Write new file")
# with open('processed_2.json', 'w') as f:
#     json.dump(res, f)

# if __name__ == '__main__':
