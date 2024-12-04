from fastapi import FastAPI, Depends
from database import get_db
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from queries import FILMS_BY_LANGUAGE_QUERY, KPI_QUERIES, FILMS_BY_CATEGORY_QUERY, TOP_COSTUMERS_QUERY
from models import FilmCount, KpiResponse, CategoryCount, TopCustomer 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/films-by-language")
async def get_films_by_language(db: Session = Depends(get_db)):
    """Get count of films per language"""
    result = db.execute(FILMS_BY_LANGUAGE_QUERY).fetchall()
    
    return [FilmCount(language=row[0], films=row[1]) for row in result]

@app.get("/kpis")
async def get_kpis(db: Session = Depends(get_db)):
    """Get various KPI metrics from the database"""
    revenue = db.execute(KPI_QUERIES["revenue"]).scalar()
    total_rentals = db.execute(KPI_QUERIES["total_rentals"]).scalar()
    avg_duration = db.execute(KPI_QUERIES["avg_duration"]).scalar()
    most_rented = db.execute(KPI_QUERIES["most_rented"]).fetchone()
    
    return {
        "revenue": float(revenue),
        "total_rentals": total_rentals,
        "average_rental_duration_days": round(float(avg_duration), 2),
        "most_rented_film": {
            "title": most_rented[0],
            "rental_count": most_rented[1]
        } 
    }

@app.get("/films-by-category")
async def get_films_by_category(db: Session = Depends(get_db)):
    """Get count of films per category"""
    result = db.execute(FILMS_BY_CATEGORY_QUERY).fetchall()
    
    return [CategoryCount(category=row[0], films=row[1]) for row in result]


@app.get("/top-customers")
async def get_top_customers(db: Session = Depends(get_db)):
    """Get top 5 customers by total payments"""
    
    result = db.execute(TOP_COSTUMERS_QUERY).fetchall()
    return [TopCustomer(customer_name=row[0], total_spent=float(row[1])) for row in result]