import requests
import json

f = open('config.json')
localhost = json.load(f)['IP']
API = f"http://admin:password@{localhost}/couchdb"

# Twitter
database_twitter = "/twitter/_design"
# SUDO
database_sudo2019 = "/sudo_summary_2019/_design"
database_sudo2020 = "/sudo_population_2020/_design"
database_sudo2021 = "/sudo_median_2021/_design"
database_sudo2018 = "/sudo_environment_2018/_design"
# abs
database_abs = "/abs/_design"
# mastodon
database_mastodon = "/mastodon_data/_design"

query = "?group=true&stale=ok"

# Twitter data
def get_state_tweet_count():
    url = API + database_twitter + "/view_state/_view/state_tweets" + query
    response = requests.get(url)
    data = response.json()["rows"]
    return data

def get_state_tweet_number():
    url = API + database_twitter + "/view_state/_view/state_tweets"
    response = requests.get(url)
    data = response.json()["rows"]
    return data

def get_victoria_tweet_count():
    url = API + database_twitter + "/view_victoria_count/_view/city_filter" + query
    response = requests.get(url)
    data = response.json()["rows"]
    return data

# climate
def get_climate():
    url = API + database_twitter + "/view_climate/_view/climate_filter" + query
    response = requests.get(url)
    data = response.json()["rows"]
    return data

def get_climate_number():
    url = API + database_twitter + "/view_climate/_view/climate_filter"
    response = requests.get(url)
    data = response.json()["rows"]
    return data

def get_climate_tesla():
    url = API + database_twitter + "/view_climate/_view/tesla_filter" + query
    response = requests.get(url)
    data = response.json()["rows"]
    return data

# coffee
def get_coffee():
    url = API + database_twitter + "/view_coffee/_view/coffee_filter" + query
    response = requests.get(url)
    data = response.json()["rows"]
    return data

def get_coffee_number():
    url = API + database_twitter + "/view_coffee/_view/coffee_filter"
    response = requests.get(url)
    data = response.json()["rows"]
    return data

# emoji
def get_emoji_no_sentiment():
    url = API + database_twitter + "/view_emoji/_view/no_sentiment" + query
    response = requests.get(url)
    data = response.json()["rows"]
    return data

def get_emoji_total():
    url = API + database_twitter + "/view_emoji/_view/total" + query
    response = requests.get(url)
    data = response.json()["rows"]
    return data

def get_emoji_yes_sentiment():
    url = API + database_twitter + "/view_emoji/_view/yes_sentiment" + query
    response = requests.get(url)
    data = response.json()["rows"]
    return data

def get_emoji_usage():
    url = API + database_twitter + "/view_emoji/_view/total"
    response = requests.get(url)
    data = response.json()["rows"]
    return data

# Mastodon
def get_emoji_mastodon():
    url = API + database_mastodon + "/view_emoji/_view/emoji_filter" + query
    response = requests.get(url)
    data = response.json()["rows"]
    return data

# SUDO data
def get_state_population_with_gender():
    url = API + database_sudo2019 + "/view_sudo_2019/_view/sudo_filter" + query
    response = requests.get(url)
    data = response.json()["rows"]
    return data

def get_local_population_with_gender():
    url = API + database_sudo2020 + "/view_sudo_2020/_view/sudo_MF_lga_filter" + query
    response = requests.get(url)
    data = response.json()["rows"]
    return data

def get_local_age_and_weekly_income():
    url = API + database_sudo2021 + "/view_sudo_median_2021/_view/sudo_vic_median_filter"
    response = requests.get(url)
    data = response.json()["rows"]
    return data

def get_environment():
    url = API + database_sudo2018 + "/view_sudo_environment_2018/_view/sudo_environment_filter" + query
    response = requests.get(url)
    data = response.json()["rows"]
    return data
