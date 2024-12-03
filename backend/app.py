from fastapi import FastAPI, Depends
from database import get_db
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.sql import text

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
    query = text("""
        SELECT l.name, COUNT(f.film_id) as film_count
        FROM language l
        LEFT JOIN film f ON l.language_id = f.language_id
        GROUP BY l.language_id, l.name
    """)
    result = db.execute(query).fetchall()
    
    return [
        {
            "language": row[0],
            "films": row[1]
        }
        for row in result
    ]

@app.get("/kpis")
async def get_kpis(db: Session = Depends(get_db)):
    """Get various KPI metrics from the database"""
    # Revenue query
    revenue_query = text("""
        SELECT SUM(amount) AS total_revenue
        FROM payment;
    """)
    
    # Total rentals query
    rentals_query = text("""
        SELECT COUNT(rental_id) AS total_rentals
        FROM rental;
    """)
    
    # Average rental duration query
    avg_duration_query = text("""
        SELECT AVG(DATEDIFF(return_date, rental_date)) AS average_rental_duration
        FROM rental
        WHERE return_date IS NOT NULL;
    """)
    
    # Most rented film query
    most_rented_query = text("""
        SELECT f.title, COUNT(r.rental_id) AS rental_count
        FROM rental r
        JOIN inventory i ON r.inventory_id = i.inventory_id
        JOIN film f ON i.film_id = f.film_id
        GROUP BY f.title
        ORDER BY rental_count DESC
        LIMIT 1;
    """)
    
    # Execute all queries
    revenue = db.execute(revenue_query).scalar()
    total_rentals = db.execute(rentals_query).scalar()
    avg_duration = db.execute(avg_duration_query).scalar()
    most_rented = db.execute(most_rented_query).fetchone()
    
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
    query = text("""
        SELECT c.name, COUNT(fc.film_id) as film_count
        FROM category c
        LEFT JOIN film_category fc ON c.category_id = fc.category_id
        GROUP BY c.category_id, c.name
    """)
    result = db.execute(query).fetchall()
    
    return [
        {
            "category": row[0],
            "films": row[1]
        }
        for row in result
    ]

@app.get("/top-customers")
async def get_top_customers(db: Session = Depends(get_db)):
    """Get top 5 customers by total payments"""
    query = text("""
        SELECT 
            CONCAT(c.first_name, ' ', c.last_name) as customer_name,
            SUM(p.amount) as total_spent
        FROM customer c
        JOIN payment p ON c.customer_id = p.customer_id
        GROUP BY c.customer_id, c.first_name, c.last_name
        ORDER BY total_spent DESC
        LIMIT 5
    """)
    result = db.execute(query).fetchall()
    return {
        "customers": [row[0] for row in result],  
        "spending": [float(row[1]) for row in result]  
    }