from flask import Flask, jsonify, request, send_file
from flask_restful import Api, Resource
from flask_cors import CORS
from view_twitter import *
import requests

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

# def get_sentiments():
#     url = "http://admin:password@172.26.132.147:5984/twitter/_design/view_s1_design/_view/climate_filter?group=true&stale=update_after"
#     response = requests.get(url)
#     data = response.json()["rows"]
#     return data

@app.route('/')
def root():
    return "COMP90024"

@app.route('/climate_sentiments', methods=['GET'])
def climate_sentiments():
    view = get_sentiments()
    return view, 200

@app.route('/climate_sentiments_csv', methods=['GET'])
def climate_sentiments_csv():
    return send_file('df_climate.csv'), 200


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port='5000')

