import requests, os, re
import pandas as pd

from nomic import atlas

DATA_PATH = "../notebooks/nomic_data.csv"

def load_data(path: str) -> pd.DataFrame:
    return pd.read_csv(path, index_col=0)

def clean_text(text: str):
    """
    Replace newlines with space. Remove any @'s. Remove links. Removes text in [].
    """
    text = text.lower()
    text = text.replace("\n", " ")
    text = re.sub('<.*?>+', '', text)
    text = re.sub('\[.*?\]', '', text)
    text = re.sub('https?://\S+|www\.\S+', '', text)
    return text


if __name__ == "__main__":
    NAME = "NomicDiscordCleaned"
    ID_FIELD = "id"
    INDEXED_FIELD = "text"
    DESCRIPTION = "Messaged scraped from the Nomic Discord"
    MAX_LENGTH = 50_000


    data = load_data(DATA_PATH)
    print(f"LOADED DATASET: {len(data)} rows")

    data.dropna(subset=['content'], inplace=True)
    data = data.loc[data['channel_name']!="joins"]
    data['content'] = data['content'].apply(clean_text)
    print("DATA CLEANED --- UPLOADING TO ATLAS")

    documents = [
        {
            "text":data['content'].values[i], "id":i
        } for i in range(len(data))
    ]

    print(documents[:10])

    project = atlas.map_text(
        data=documents[:MAX_LENGTH],
        id_field="id",
        indexed_field="text",
        name="NomicDiscord",
        description="Messages scraped from the Nomic Discord",
        reset_project_if_exists=True
    )
    print(f"PROJECT CREATED: {project.id}")


