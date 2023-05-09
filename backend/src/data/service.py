import os
import pandas as pd
import numpy as np
from src.data.schemas import TimeSeriesDataPoint, StaticEvent, Message
from src.data.constants import STATIC_EVENTS
from src.data.utils import get_reaction_count, get_joins

# TODO: support for resampling at diff freq on frontend
async def get_member_growth(data: pd.DataFrame, freq: str = "W") -> list[TimeSeriesDataPoint]:
    joins = get_joins(data)
    resampled = joins.resample(freq, on="timestamp")
    resampled_data = resampled.count()['id']

    response_data = []

    for i in range(len(resampled_data)):
        timestamp = resampled_data.index[i]
        value = resampled_data[i]
        response_data.append(
            TimeSeriesDataPoint(timestamp=timestamp, value=value)
        )
    return response_data

async def get_static_events() -> list[StaticEvent]:
    return STATIC_EVENTS


async def get_top_messages(data: pd.DataFrame, k: int = 5) -> list[Message]:
    data = data.drop(
        data.loc[data['channel_name'] == "roles"].index
    )
    data['reaction_count'] = data['reactions'].apply(get_reaction_count)
    sorted_messages = data.sort_values(by='reaction_count', ascending=False)
    top_k = sorted_messages[:k]

    response_data = []

    for i, item in enumerate(top_k):
        response_data.append(
            Message(id=i, user=item['user_name'], reaction_count=item['reaction_count'], timestamp=item['timestamp'])
        )

    return response_data


def get_time_to_comm(data: pd.DataFrame):
    data_ex_join_channel = data.loc[data['channel_name'] != "joins"]
    data_ex_join_channel['time_to_first_comm'] = (data_ex_join_channel['timestamp'] - data_ex_join_channel['join_time']) / np.timedelta64(1, 'm')
    sorted_data = data_ex_join_channel.sort_values(by="timestamp")
    sorted_data = sorted_data.drop_duplicates(subset=['user_id'], keep="first")
    sorted_data = sorted_data.loc[sorted_data['time_to_first_comm'] > 0]

    return {
        "median":sorted_data['time_to_first_comm'].median(),
        "mean": sorted_data['time_to_first_comm'].mean(),
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
                "user":username,
                "value": value
            }
        )
    return top_comms

async def get_user_stats(data: pd.DataFrame, k: int = 5):
    time_to_comm = get_time_to_comm(data)
    lurker_count = get_lurker_count(data)
    top_comms = get_top_communicators(data, k)
    total_users = len(data['user_id'].unqiue())

    return {
        "time_to_first_comm_stats":time_to_comm,
        "lurker_count": lurker_count,
        "top_communicators":top_comms,
        "total_users":total_users
    }





