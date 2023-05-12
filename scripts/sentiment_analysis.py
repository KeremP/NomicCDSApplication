import requests, os
from tqdm import tqdm
from dotenv import load_dotenv
import pandas as pd
from transformers import AutoTokenizer
load_dotenv()

HF_MODEL = "cardiffnlp/twitter-roberta-base-sentiment-latest"
DATA_PATH = "../notebooks/nomic_data.csv"

# HF Inference Endpoint
HF_URL = os.getenv("HF_URL")
HF_TOKEN = os.getenv("HF_TOKEN")

def load_tokenzer(model_name: str):
    return AutoTokenizer.from_pretrained(model_name)

def truncate_text(text: str, tokenizer: AutoTokenizer):
    encoded = tokenizer(text, max_length=500, truncation=True)
    result = tokenizer.convert_ids_to_tokens(encoded['input_ids'])
    out = tokenizer.convert_tokens_to_string(result)
    return out

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
    resp = requests.post(HF_URL, json=payload, headers=headers)
    if resp.status_code != 200:
        raise Exception(resp.text)
    return resp.json()

if __name__ == "__main__":
    data = load_data(DATA_PATH)
    data.dropna(subset=['content'], inplace=True)
    data = data.loc[data['channel_name']!="joins"]
    tokenizer = load_tokenzer(HF_MODEL)
    data['content'] = data['content'].apply(clean_text)
    data['content'] = data['content'].apply(lambda x: truncate_text(x, tokenizer))
    sentiment_array = []
    for i in tqdm(range(0, len(data), 64)):
        end = min(i+64, len(data))
        batch = data['content'].values[i:end]
        result = classify(batch.tolist())
        sentiment_array+=[r['label'] for r in result]
        
    data['sentiment'] = sentiment_array
    data.to_csv("./nomic_sentiment_data.csv")
