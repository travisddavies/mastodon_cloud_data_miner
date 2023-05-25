from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from views import *

import couchdb

f = open('config.json')
localhost = json.load(f)['IP']
# authentication
admin = 'admin'
password = 'password'
# instance 4
url = f'http://{admin}:{password}@{localhost}/couchdb'
# get couchdb instance
couch = couchdb.Server(url)

app = Flask(__name__)
api = Api(app)
CORS(app)

@app.route('/')
def root():
    return "COMP90024"

@app.route('/state_tweet_count', methods=['GET'])
def state_tweet_count():
    view = get_state_tweet_count()
    return view, 200

@app.route('/tweet_number', methods=['GET'])
def tweet_number():
    view = get_state_tweet_number()
    return view, 200

@app.route('/victoria_tweet_count', methods=['GET'])
def victoria_tweet_count():
    view = get_victoria_tweet_count()
    return view, 200

@app.route('/topic_climate', methods=['GET'])
def topic_climate():
    view = get_climate()
    return view, 200

@app.route('/topic_climate_number', methods=['GET'])
def topic_climate_number():
    view = get_climate_number()
    return view, 200

@app.route('/topic_tesla_related_climate', methods=['GET'])
def topic_tesla_related_climate():
    view = get_climate_tesla()
    return view, 200

@app.route('/topic_coffee', methods=['GET'])
def topic_coffee():
    view = get_coffee()
    return view, 200

@app.route('/topic_coffee_number', methods=['GET'])
def topic_coffee_number():
    view = get_coffee_number()
    return view, 200

@app.route('/emoji_no_sentiment', methods=['GET'])
def emoji_no_sentiment():
    view = get_emoji_no_sentiment()
    return view, 200
@app.route('/emoji_total', methods=['GET'])
def emoji_total():
    view = get_emoji_total()
    return view, 200

@app.route('/emoji_with_sentiment', methods=['GET'])
def emoji_with_sentiment():
    view = get_emoji_yes_sentiment()
    return view, 200

@app.route('/emoji_usage', methods=['GET'])
def emoji_usage():
    view = get_emoji_usage()
    return view, 200

@app.route('/emoji_mastodon', methods=['GET'])
def emoji_mastodon():
    view = get_emoji_mastodon()
    return view, 200

@app.route('/state_population_male_female_sudo', methods=['GET'])
def state_population_male_female_sudo():
    view = get_state_population_with_gender()
    return view, 200

@app.route('/local_population_male_female_sudo', methods=['GET'])
def local_population_male_female_sudo():
    view = get_local_population_with_gender()
    return view, 200

@app.route('/local_median_age_and_weekly_income_sudo', methods=['GET'])
def local_median_age_and_weekly_income_sudo():
    view = get_local_age_and_weekly_income()
    return view, 200

@app.route('/environment_sudo', methods=['GET'])
def environment_sudo():
    view = get_environment()
    return view, 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='5000')


