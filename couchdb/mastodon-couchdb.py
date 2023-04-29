from mastodon import Mastodon, StreamListener
from bs4 import BeautifulSoup
import json
import couchdb
import datetime
from langdetect import detect
from geopy.geocoders import Nominatim

# CouchDB connection details
couchdb_server = 'http://admin:password@localhost:5984/'

# Connect to CouchDB
couch = couchdb.Server(couchdb_server)

# Create or access a CouchDB database
db_name = 'mastodon_data'
if db_name in couch:
    db = couch[db_name]
else:
    db = couch.create(db_name)

# Initialize geocoding API
geolocator = Nominatim(user_agent='mastodon_streaming')

# Helper function to get country from latitude and longitude coordinates
def get_country_from_coords(latitude, longitude):
    location = geolocator.reverse(f"{latitude}, {longitude}")
    if location and location.raw.get('address'):
        return location.raw['address'].get('country')
    return None

# chatgpt
def datetime_to_str(obj):
    if isinstance(obj, datetime.datetime):
        return obj.isoformat()
    raise TypeError(f"{type(obj).__name__} is not JSON serializable")

m = Mastodon(
    api_base_url=f"https://mastodon.au",
    access_token="dLZTjc6NZc69o_EZhzRKc1Vqf0P5aj32gWQtYaYpZ3Y",
)

class Listener(StreamListener):
    def on_update(self, status):
        content = status.get('content', '')

        # Check language of content
        try:
            lang = detect(content)
        except:
            lang = None
        
        # Convert content into plain text
        cont_text = BeautifulSoup(content, 'html.parser').get_text()

        if lang == 'en':
            print(json.dumps(status, indent=2, sort_keys=True, default=datetime_to_str))

            # Get country information from location details
            country = None
            longitude = None
            latitude = None
            if status.get('geo') and 'coordinates' in status['geo']:
                latitude, longitude = status['geo']['coordinates']
                country = get_country_from_coords(latitude, longitude)

            # Save to CouchDB
            data = {
                '_id': str(status['id']),
                'content': content,
                'plain_text_content': cont_text,
                'created_at': status['created_at'].isoformat(),
                'username': status['account']['username'],
                'tags': [tag.get('name') for tag in status.get('tags', [])],
                'country': country,
                'latitude': latitude, # added line
                'longitude': longitude # added line
            }
            db.save(data)

def main():
    m.stream_public(Listener())

if __name__ == '__main__':
    main()
