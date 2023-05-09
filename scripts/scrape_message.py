import requests, json, os, time
import pandas as pd
import backoff
from tqdm import tqdm
from dotenv import load_dotenv
load_dotenv()

BASE_URL = "https://discord.com/api/v10"
DISCORD_EPOCH = 1420070400000
BASE_CHANNEL = "1076964370942267462"

def get_headers():
    auth_token = os.getenv("DISCORD_TOKEN")
    headers = {
        "authorization":auth_token
    }
    return headers

def get_channels(server: str) -> list[str]:
    endpoint = f"{BASE_URL}/guilds/{server}/channels"
    resp = requests.get(endpoint, headers=get_headers())
    return resp.json()

def get_channel(channel: str) -> dict:
    endpoint = f"{BASE_URL}/channels/{channel}"
    resp = requests.get(endpoint, headers=get_headers())
    return resp.json()

def get_snowflake(timestamp: int) -> str:
    return (timestamp - DISCORD_EPOCH) << 22

@backoff.on_exception(backoff.expo, Exception, max_tries=20)
def get_message_batch(channel: str, limit: int, before: bool = False, snowflake: str = None,):
    if snowflake is None:
        endpoint = f"{BASE_URL}/channels/{channel}/messages?limit={limit}"
    else:
        field = "before" if before else "after"
        endpoint = f"{BASE_URL}/channels/{channel}/messages?{field}={snowflake}&limit={limit}"
    resp = requests.get(endpoint, headers=get_headers())
    return resp.json()

def get_all_channel_messages(channel: str, limit: int = 100):
    messages = []
    last_message = None
    while True:
        try:
            if last_message is None:
                batch = get_message_batch(channel, limit)
                
            else:
                batch = get_message_batch(channel, limit, before=True, snowflake=last_message['id'])

            messages+=batch
            if len(batch) == 0:
                    break
            last_message = batch[-1]
        except Exception as e:
            if last_message is None:
                print(f"!!! Exception {e} !!!")
            else:
                print(f"!!! Exception at message ID: {last_message['id']}. {e} !!!")
            break
    return messages

def build_df(messages, channel):
    channel_name = channel['name']
    df = pd.DataFrame(messages)
    df['channel_name'] = channel_name
    return df

if __name__ == "__main__":

    channels = get_channels(BASE_CHANNEL)
    dfs = []

    for channel in tqdm(channels):
        print(f"scraping channel: {channel['name']}")
        messages = get_all_channel_messages(channel['id'])
        df = build_df(messages, channel)
        dfs.append(df)
        df.to_csv(f"./nomic_discord_{channel['name']}.csv")
    
    final_df = pd.concat(dfs)
    final_df.to_csv("./nomic_discord_all.csv")