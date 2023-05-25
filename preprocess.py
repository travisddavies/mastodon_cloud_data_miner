import json
import tarfile
from mpi4py import MPI
import os
import time
import re
from textblob import TextBlob
import nltk
from nltk.corpus import stopwords

# with tarfile.open("twitter-huge.json.zip", 'r:gz') as t:
#     json_file_name = [name for name in t.getnames() if name.endswith('.json')][0]
#
#     with t.extractfile(json_file_name) as f:
#         huge_data = json.load(f)

with open("twitter-small.json", "r", encoding="utf-8") as file:
    data = json.load(file)
    tweet_data = data['rows']

# MPI
comm = MPI.COMM_WORLD
rank = comm.Get_rank()
size = comm.Get_size()
start_time = time.time()

def clean_process(text):
    # remove URL
    text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
    # remove HTML
    text = re.sub(r'<[^>]+>', '', text)
    # Remove usernames starting with @
    text = re.sub(r'@\w+', '', text)
    # remove special characters and underscores
    text = re.sub(r'[\W_]+', ' ', text)
    # Remove emoticons and special characters
    text = text.encode('ascii', 'ignore').decode('ascii')
    text = text.lower()
    return text

def tokenize_lemmatize(text):
    text = TextBlob(text)
    text = text.words
    text = [word.lemmatize()for word in text]
    return text

# nltk.download('stopwords')
# nltk.download('punkt')
# nltk.download('wordnet')
# include the information for sentiments
custom_stopwords = set(stopwords.words('english')) - {"not", "but", "or", "and"}
def remove_stopwords(text, stopwords):
    text = [word for word in text if word not in stopwords]
    text = ' '.join(text)
    return text

def preprocess(text):
    text = clean_process(text)
    text = tokenize_lemmatize(text)
    text = remove_stopwords(text, custom_stopwords)
    return text

# for token from dataset, replace "|" to " "
def process_tokens(token):
    token = token.replace("|", " ")
    return token

def sentiment(text):
    analysis = TextBlob(text)
    sentiment_polarity = analysis.sentiment.polarity
    sentiment_subjectivity = analysis.sentiment.subjectivity
    sentiment1 = ''
    if sentiment_polarity > 0:
        sentiment1 = "Positive"
    elif sentiment_polarity < 0:
        sentiment1 = "Negative"
    else:
        sentiment1 = "Neutral"
    print(f"Sentiment_polarity: {sentiment_polarity} | {sentiment1}")
    sentiment2 = ''
    if sentiment_subjectivity >= 0.5:
        sentiment2 = "High subjectivity"
    else:
        sentiment2 = "Low subjectivity"
    print(f"Sentiment_subjectivity: {sentiment_subjectivity} | {sentiment2}")
    print("\n")

count = 0
for tweet in tweet_data:
    text = tweet['doc']['data']['text']
    #token = tweet['value']['tokens']
    given_sentiment = tweet['doc']['data']['sentiment']
    print("###Given_sentiment", given_sentiment)
    preprocess_text = preprocess(text)
    print(preprocess_text)
    sentiment_score = sentiment(preprocess_text)
    print(sentiment_score)
    #token_word = process_tokens(token)
    #sentiment_score = sentiment(token)
    count += 1





