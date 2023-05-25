from mastodon import Mastodon, StreamListener
from bs4 import BeautifulSoup
import json
import couchdb
import datetime

# CouchDB connection details
couchdb_server = 'http://admin:password@172.26.132.152/couchdb'

# Connect to CouchDB
couch = couchdb.Server(couchdb_server)

# Create or access a CouchDB database
db_name = 'mastodon_data'
if db_name in couch:
    db = couch[db_name]
else:
    db = couch.create(db_name)


# get timestamps
def datetime_to_str(obj):
    if isinstance(obj, datetime.datetime):
        return obj.isoformat()
    raise TypeError(f"{type(obj).__name__} is not JSON serializable")

# mastodon server
m = Mastodon(
    api_base_url=f"https://mastodon.au",
    access_token="dLZTjc6NZc69o_EZhzRKc1Vqf0P5aj32gWQtYaYpZ3Y",
)

# mastodon listener
class Listener(StreamListener):
    def on_update(self, status):
        content = status.get('content', '')       
        # Convert content into plain text
        cont_text = BeautifulSoup(content, 'html.parser').get_text()
        # Save to CouchDB
        data = {
            '_id': str(status['id']),
            'content': content,
            'plain_text_content': cont_text,
            'created_at': status['created_at'].isoformat(),
            'username': status['account']['username'],
            'tags': [tag.get('name') for tag in status.get('tags', [])]
        }
        db.save(data)

def main():
    m.stream_public(Listener())

if __name__ == '__main__':
    main()
