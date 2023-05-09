import os
import pandas as pd

def get_joins(data: pd.DataFrame):
    return data.loc[data['channel_name'] == "joins"]

def get_id_username(x: str):
    splits = x.split("',")
    id = splits[0].split(": ")[1].replace("'","")
    username = splits[1].split(": ")[1].replace("'","")
    return id, username

def get_id(x: str):
    id, _ = get_id_username(x)
    return id

def get_username(x: str):
    _, username = get_id_username(x)
    return username

def get_unique_user_data(joins: pd.DataFrame):
    ids = joins['author'].apply(get_id)
    usernames = joins['author'].apply(get_username)
    users = pd.DataFrame({"user_id":ids,"username":usernames, "join_time": joins['timestamp']})
    users = users.sort_values(by="join_time")
    users = users.drop_duplicates(subset=['user_id'], keep="first")
    return users

def load_data(path: str):
    data = pd.read_csv(path, index_col=0)
    data['timestamp'] = pd.to_datetime(data['timestamp'], format="ISO8601")
    data.dropna(subset=['id'], inplace=True)
    joins = get_joins(data)
    users = get_unique_user_data(joins)
    data['user_id'] = data['author'].apply(get_id)
    data['user_name'] = data['author'].apply(get_username)
    merged = data.merge(users, on="user_id", how="inner")
    return merged

def get_reaction_count(x: str):
    if type(x) is not str: return 0
    x = x.replace("'",'"')
    x_split = x.split("emoji")
    counts = 0
    for s in x_split:
        if "count" not in s: continue
        try:
            counts+=int(
                    s.split('count":')[1].split(",")[0].strip()
                )
        except:
            continue
    return counts