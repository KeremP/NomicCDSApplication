from pydantic import BaseModel
from typing import Optional

class TimeSeriesDataPoint(BaseModel):
    timestamp: str
    value: int

class StaticEvent(BaseModel):
    timestamp: str
    event: str
    value: int

class Message(BaseModel):
    id: int
    user: str
    reactionCount: int
    timestamp: str
    content: str