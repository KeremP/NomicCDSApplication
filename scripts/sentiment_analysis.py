import requests, os
from dotenv import load_dotenv
import pandas as pd
load_dotenv()

DATA_PATH = "../notebooks/nomic.csv"

# HF Inference Endpoint
HF_URL = os.getenv("HF_URL")
HF_TOKEN = os.getenv("HF_TOKEN")

def load_data(path: str):
    return pd.read_csv(path, index_col=0)

def clean_text(text: str):
    text = text.replace("\n", " ")
    return text.split("> ")[-1]

def classify(text: str):
    headers = {
        "Authorization": f"Bearer {HF_TOKEN}"
    }
    payload = {"inputs":text}
    resp = requests.post(HF_URL, data=payload, headers=headers)
    return resp.json()

if __name__ == "__main__":
    data = load_data(DATA_PATH)

    sentiment_array = []
    for _, row in data.iterrows():
        result = classify(row['content'])
        sortedResult = sorted(result, key="score", reverse=True)
        sentiment_array.append(sortedResult[0]['label'])
    
    data['sentiment'] = sentiment_array
    data.to_csv("./nomic_sentiment_data.csv")

