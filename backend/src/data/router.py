import os
from fastapi import APIRouter
from src.data.service import get_member_growth, get_static_events, get_top_messages, get_user_stats
from src.data.schemas import TimeSeriesDataPoint, StaticEvent, Message
from src.data.utils import load_data

DATA_PATH = os.path.abspath("src/data/nomic_data.csv")

DATA = load_data(DATA_PATH)

router = APIRouter()

@router.get("/get_member_growth", response_model=list[TimeSeriesDataPoint])
async def member_growth(freq: str = "W"):
    response = await get_member_growth(DATA, freq)
    return response

@router.get("/get_static_events", response_model=list[StaticEvent])
async def static_events():
    response = await get_static_events()
    return response

@router.get("/get_top_messages", response_model=list[Message])
async def top_messages(k: int = 5):
    response = await get_top_messages(DATA, k)
    return response

@router.get("/get_user_stats")
async def user_stats(k: int = 5):
    response = await get_user_stats(DATA, k)
    return response
    
