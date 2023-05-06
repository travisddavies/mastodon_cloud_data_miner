import requests
import pandas as pd

db_link = "http://admin:password@172.26.132.147:5984/twitter/_design/view_s1_design/_view/my_filter"

data = requests.get(db_link).json()["rows"]

df = pd.DataFrame(data)
df = pd.concat([df, pd.json_normalize(df["key"])], axis=1)
df = df.drop("key", axis=1)
print(df)
df.to_csv('df_1.csv')
