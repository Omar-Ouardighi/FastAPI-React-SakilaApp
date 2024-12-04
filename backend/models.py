from pydantic import BaseModel
from typing import List, Dict, Any

class FilmCount(BaseModel):
    language: str
    films: int

class KpiResponse(BaseModel):
    revenue: float
    total_rentals: int
    average_rental_duration_days: float
    most_rented_film: Dict[str, Any]

class CategoryCount(BaseModel):
    category: str
    films: int

class TopCustomer(BaseModel):
    customer_name: str
    total_spent: float
