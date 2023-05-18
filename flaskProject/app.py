from flask import Flask, jsonify, request, send_file
from flask_restful import Api, Resource
from flask_cors import CORS
from views import *

import couchdb

# authentication
admin = 'admin'
password = 'password'
# instance 3 @localhost:8080
url = f'http://{admin}:{password}@localhost:8080/'
# get couchdb instance
couch = couchdb.Server(url)

# # indicate the db name
# db_name = 'twitter'
#
# # if not exist, create one
# if db_name not in couch:
#     db = couch.create(db_name)
# else:
#     db = couch[db_name]

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

@app.route('/victoria_tweet_count', methods=['GET'])
def victoria_tweet_count():
    view = get_victoria_tweet_count()
    return view, 200

@app.route('/topic_climate', methods=['GET'])
def topic_climate():
    view = get_climate()
    return view, 200

@app.route('/topic_tesla_related_climate', methods=['GET'])
def topic_tesla_related_climate():
    view = get_climate_tesla()
    return view, 200

@app.route('/topic_coffee', methods=['GET'])
def topic_coffee():
    view = get_coffee()
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

@app.route('/emoji_mastodon', methods=['GET'])
def emoji_mastodon():
    view = get_emoji_mastodon()
    return view, 200

# @app.route('/swear_total', methods=['GET'])
# def swear_total():
#     view = get_swear_total()
#     return view, 200
#
# @app.route('/swear_state', methods=['GET'])
# def swear_state():
#     view = get_swear_state()
#     return view, 200

# @app.route('/swear_victoria', methods=['GET'])
# def swear_victoria():
#     view = get_swear_victoria()
#     return view, 200

@app.route('/state_population_male_female', methods=['GET'])
def state_population_male_female():
    view = get_state_population_with_gender()
    return view, 200

@app.route('/local_population_male_female', methods=['GET'])
def local_population_male_female():
    view = get_local_population_with_gender()
    return view, 200

@app.route('/local_median_age_and_weekly_income', methods=['GET'])
def local_median_age_and_weekly_income():
    view = get_local_age_and_weekly_income()
    return view, 200

# @app.route('/climate_sentiments_csv', methods=['GET'])
# def climate_sentiments_csv():
#     return send_file('df_climate.csv'), 200


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port='5000')


