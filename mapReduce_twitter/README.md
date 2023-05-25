As we are performing keyword matching with MapReduce, it is troublesome to write long MapReduce functions in string form, and thus for simplification purposes, we decided to write the MapReduce functions in JavaScript first, then turn into a string and produce a view in the correct JSON format.

Thus, to see the details of MapReduce functions of our scenarios, please look at:

- view_s1.js for climate scenario
- view_s2.js for emoji scenario
- view_s3.js for coffee scenario

The design documents (JSON file) will be produced by running the above java script by for example \'93node view_s1.js\'94. The corresponding design document will be produced:
- view_s1.json for climate scenario
- view_emoji.json for emoji scenario
- view_s3.json for coffee scenario

These are the documents that will be uploaded to CouchDB databases via PUT.

Similarly for other views:
- mastodon_view.js => mastodon_view.json
- state_tweets.js => view_state.json 
- victoria_tweets_count.js => victoria_tweets_count.json

References for keywords used for matching scenarios:
- Climate Scenario: https://www.climaterealityproject.org/blog/key-terms-you-need-understand-climate-change 
- Coffee Scenario: https://www.merlo.com.au/blogs/learn/different-types-of-coffee-drinks-explained 
- chatgpt is also used to help with generating some idea of keywords 