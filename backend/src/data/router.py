import os
from fastapi import APIRouter
from src.data.service import get_member_growth, get_top_messages, get_user_stats, get_topics
from src.data.schemas import TimeSeriesDataPoint, StaticEvent, Message
from src.data.utils import load_data, load_events, load_sentiment
from typing import Union

ATLAST_MAP = "deb7a93e-fe0a-444d-8d4f-c92898b43d90"
DATA_PATH = os.path.abspath("src/data/nomic_data.csv")
EVENT_PATH = os.path.abspath("src/data/events.csv")
SENTIMENT_PATH = os.path.abspath("src/data/nomic_sentiment_data.csv")

DATA = load_data(DATA_PATH)
EVENTS = load_events(EVENT_PATH)
SENTIMENT = load_sentiment(SENTIMENT_PATH)

router = APIRouter()

@router.get("/get_member_growth")
async def member_growth(freq: str = "W"):
    response = await get_member_growth(DATA, EVENTS, freq)
    return response

@router.get("/get_top_messages", response_model=list[Message])
async def top_messages(k: int = 5):
    response = await get_top_messages(DATA, k)
    return response

@router.get("/get_user_stats")
async def user_stats(k: int = 5):
    response = await get_user_stats(DATA, k)
    return response

@router.get("/get_user_sentiment")
async def user_sentiment():
    return {
        "neutral":int(SENTIMENT['neutral']),
        "negative":int(SENTIMENT['negative']),
        "positive":int(SENTIMENT['positive'])
    }
    
@router.get("/get_topics")
async def atlas_topics():
    response = await get_topics(ATLAST_MAP)
    return response