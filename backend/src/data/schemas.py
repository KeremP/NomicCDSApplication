from pydantic import BaseModel
from typing import Optional

class TimeSeriesDataPoint(BaseModel):
    timestamp: str
    value: int

class StaticEvent(BaseModel):
    id: int
    timestamp: str
    event_type: str # Tweet, NewsEvent

class Message(BaseModel):
    id: str
    user: str
    reaction_count: int
    timestamp: str