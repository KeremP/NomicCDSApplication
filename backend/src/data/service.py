import os
import pandas as pd
import numpy as np
from src.data.schemas import TimeSeriesDataPoint, StaticEvent, Message
from src.data.utils import get_reaction_count, get_joins
from typing import Union
from nomic import atlas

# TODO: support for resampling at diff freq on frontend
async def get_member_growth(data: pd.DataFrame, eventData: pd.DataFrame, freq: str = "W") -> dict[str,Union[list[TimeSeriesDataPoint], list[StaticEvent]]]:
    joins = get_joins(data)
    resampled = joins.resample(freq, on="timestamp")
    resampled_data = resampled.count()['id']
    event_data = get_events(resampled_data, eventData)
    print(event_data)
    response_data = []

    for i in range(len(resampled_data)):
        timestamp = resampled_data.index[i]
        value = resampled_data[i]
        response_data.append(
            TimeSeriesDataPoint(timestamp=str(timestamp), value=value)
        )
    return {"memberGrowth":response_data, "events":event_data}

def get_events(joinData: pd.DataFrame, eventData: pd.DataFrame) -> list[StaticEvent]:
    values = []
    for _, row in eventData.iterrows():
        date = row['timestamp']
        temp_a = joinData.loc[joinData.index < date]
        temp_b = joinData.loc[joinData.index > date]
        try:
            a = temp_a[-1]
            b = temp_b[0]
            value = (a+b)//2
            values.append(value)
        except IndexError:
            values.append(None)
    out = eventData.copy(deep=True)
    out['value'] = values
    out = out.dropna(subset=['value'])
    return [
        StaticEvent(timestamp=str(out.iloc[i]['timestamp']), event=out.iloc[i]['event'], value=out.iloc[i]['value']) for i in range(len(out))
    ]
    


async def get_top_messages(data: pd.DataFrame, k: int = 5) -> list[Message]:
    data = data.drop(
        data.loc[data['channel_name'] == "roles"].index
    )
    data['reaction_count'] = data['reactions'].apply(get_reaction_count)
    sorted_messages = data.sort_values(by='reaction_count', ascending=False)
    top_k = sorted_messages[:k]

    response_data = []
    for index, row in top_k.iterrows():
        
        username = row['user_name']
        reaction_count = row['reaction_count']
        timestamp = row['timestamp']
        content = row['content'].split("> ")[-1]
        response_data.append(
            Message(id=int(index), user=username, reactionCount=reaction_count, timestamp=str(timestamp), content=content)
        )

    return response_data

def formatTime(time: float):
    hour = time // 3600
    seconds = time % 3600
    minutes = seconds // 60
    seconds = seconds % 60
    return "%02d:%02d:%02d" % (hour, minutes, seconds)



def get_time_to_comm(data: pd.DataFrame):
    data_ex_join_channel = data.loc[data['channel_name'] != "joins"]
    data_ex_join_channel['time_to_first_comm'] = (data_ex_join_channel['timestamp'] - data_ex_join_channel['join_time']) / np.timedelta64(1, 's')
    sorted_data = data_ex_join_channel.sort_values(by="timestamp")
    sorted_data = sorted_data.drop_duplicates(subset=['user_id'], keep="first")
    sorted_data = sorted_data.loc[sorted_data['time_to_first_comm'] > 0]

    median = round(sorted_data['time_to_first_comm'].median())
    mean = round(sorted_data['time_to_first_comm'].mean())


    return {
        "median": formatTime(median),
        "mean": formatTime(mean),
    }

def get_lurker_count(data: pd.DataFrame):
    contributors = set(data.loc[data['channel_name'] != 'joins']['user_id'].unique())
    all_ids = set(data['user_id'].unique())
    lurker_count = len(all_ids - contributors)
    return lurker_count

def get_top_communicators(data: pd.DataFrame, k: int = 5):
    top_user_ids = data['user_id'].value_counts()[:k]

    top_comms = []
    for i in range(len(top_user_ids)):
        value = top_user_ids[i]
        username = data.loc[data['user_id'] == top_user_ids.index[i]]['user_name']
        top_comms.append(
            {
                "user": str(username.values[0]),
                "value": int(value)
            }
        )
    return top_comms

async def get_user_stats(data: pd.DataFrame, k: int = 5):
    time_to_comm = get_time_to_comm(data)
    lurker_count = get_lurker_count(data)
    top_comms = get_top_communicators(data, k)
    total_users = len(data['user_id'].unique())

    return {
        "time_to_first_comm_stats":time_to_comm,
        "lurker_count": lurker_count,
        "top_communicators":top_comms,
        "total_users":total_users
    }


async def get_topics(project_id: str):
    project = atlas.AtlasProject(project_id=project_id)
    map = project.maps[0]
    topic_data = map.get_topic_data()
    return topic_data[:4]
