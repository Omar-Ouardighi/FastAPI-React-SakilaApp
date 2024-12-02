from fastapi import FastAPI, Depends
from database import get_db
from sqlalchemy.orm import Session
from sqlalchemy.sql import text

app = FastAPI()


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
    return {
        "labels": [row[0] for row in result],  # Language names
        "data": [row[1] for row in result]  # Film counts
    }