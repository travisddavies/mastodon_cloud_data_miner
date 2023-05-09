import requests
import pandas as pd

url = "http://admin:password@172.26.132.147:5984/twitter/_design/view_s1_design/_view/climate_filter?group=true&stale=update_after"
response = requests.get(url)
data = response.json()["rows"]
df = pd.DataFrame(data)
print(df)
df["bbox"] = df["key"].apply(lambda x: x[0])
df["location"] = df["key"].apply(lambda x: x[1])
df["avg_sentiment"] = df["value"].apply(lambda x: x[0])
df["count"] = df["value"].apply(lambda x: x[1])
df["avg_sentiment"] = df["avg_sentiment"] / df["count"]
df = df.drop(["key", "value"], axis=1)
print(df)
df.to_csv("df_climate.csv")
