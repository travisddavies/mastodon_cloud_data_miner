import couchdb
import json

# Connect to the local CouchDB instance
couch = couchdb.Server('http://admin:password@localhost:5984/')

# Specify the database name
db_name = 'twitter_downsized'

# Create the database if it doesn't exist
if db_name not in couch:
    db = couch.create(db_name)
else:
    db = couch[db_name]

# Open the JSON file and load the data
with open('twitter_downsized_small.json', 'r') as f:
    data = json.load(f)

# Save the list of documents using the bulk document API
list = []
for doc in data["rows"]:
    print(doc)
    list.append(doc)

db.update(list)