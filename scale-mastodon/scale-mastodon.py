
from mastodon import Mastodon, StreamListener
from bs4 import BeautifulSoup
import couchdb
import datetime
import netifaces

INSTANCE_02 = "172.26.135.237"
INSTANCE_03 = "172.26.135.31"
INSTANCE_04 = "172.26.135.191"

def get_ip_address():
    # Get the IPv4 address of the 'eth0' interface
    interface_name = 'eth0'

    interfaces = netifaces.interfaces()
    if interface_name in interfaces:
        addresses = netifaces.ifaddresses(interface_name).get(netifaces.AF_INET)
        if addresses:
            ipv4_address = addresses[0]['addr']
    return ipv4_address

def divide_word_list(word_list, instanceNo):
    words_per_division = len(word_list) // 3
    start = (instanceNo-1) * words_per_division
    end = instanceNo*words_per_division
    sector = word_list[start:end]
    return sector

def get_word_list(ip_address, words):
    # Print different things based on the IP address
    if ip_address == INSTANCE_01:
        word_list = divide_word_list(words, 1)
    elif ip_address == INSTANCE_02:
        word_list = divide_word_list(words, 2)
    elif ip_address == INSTANCE_03:
        word_list = divide_word_list(words, 3)
    else:
        word_list = []
    return word_list

# chatgpt
def datetime_to_str(obj):
    if isinstance(obj, datetime.datetime):
        return obj.isoformat()
    raise TypeError(f"Object of type {type(obj).__name__} is not JSON serializable")

class Listener(StreamListener):
    def __init__(self, _word):
        self.word = _word

    def on_update(self, status):
        keywords = get_word_list(get_ip_address(), self.word)
        # Extract tags and content from status
        tags = [tag.get('name') for tag in status.get('tags', [])]
        content = status.get('content', '')

        # Convert content into plain text
        cont_text = BeautifulSoup(content, 'html.parser').get_text()

        # Check for keywords in both content and tag
        if any(keyword in [tag.lower() for tag in tags] for keyword in keywords) or \
                any(keyword in cont_text.lower() for keyword in keywords):
            # Save to CouchDB
            data = {
                '_id': str(status['id']),
                'content': content,
                'plain_text_content': cont_text,
                'created_at': status['created_at'].isoformat(),
                'username': status['account']['username'],
                'tags': tags
            }
            db.save(data)


def main():
    
    # Read the file path and divisions from command-line arguments
    file_path = "keywords.txt" 
    # Open the file in read mode
    with open(file_path, "r") as file:
        # Read the contents of the file
        content = file.read()
    # Split the content into words
    words = [word.strip() for word in content.split(",")]

    # CouchDB connection details
    couchdb_server = 'http://admin:password@172.26.135.191:8081'

    # Connect to CouchDB
    couch = couchdb.Server(couchdb_server)

    # Create or access a CouchDB database
    db_name = 'mastodon_data'
    if db_name in couch:
        db = couch[db_name]
    else:
        db = couch.create(db_name)

    m = Mastodon(
    api_base_url=f"https://mastodon.au",
    access_token="dLZTjc6NZc69o_EZhzRKc1Vqf0P5aj32gWQtYaYpZ3Y",
    )    

    m.stream_public(Listener(words))

if __name__ == '__main__':
    main()



         






