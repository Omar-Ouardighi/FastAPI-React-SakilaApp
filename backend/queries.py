from sqlalchemy.sql import text

# SQL Queries
FILMS_BY_LANGUAGE_QUERY = text("""
    SELECT l.name, COUNT(f.film_id) as film_count
    FROM language l
    LEFT JOIN film f ON l.language_id = f.language_id
    GROUP BY l.language_id, l.name
""")

KPI_QUERIES = {
    "revenue": text("SELECT SUM(amount) AS total_revenue FROM payment;"),
    "total_rentals": text("SELECT COUNT(rental_id) AS total_rentals FROM rental;"),
    "avg_duration": text("""
        SELECT AVG(DATEDIFF(return_date, rental_date)) AS average_rental_duration
        FROM rental
        WHERE return_date IS NOT NULL;
    """),
    "most_rented": text("""
        SELECT f.title, COUNT(r.rental_id) AS rental_count
        FROM rental r
        JOIN inventory i ON r.inventory_id = i.inventory_id
        JOIN film f ON i.film_id = f.film_id
        GROUP BY f.title
        ORDER BY rental_count DESC
        LIMIT 1;
    """)
}

FILMS_BY_CATEGORY_QUERY = text("""
        SELECT c.name, COUNT(fc.film_id) as film_count
        FROM category c
        LEFT JOIN film_category fc ON c.category_id = fc.category_id
        GROUP BY c.category_id, c.name
    """)

TOP_COSTUMERS_QUERY = text("""
        SELECT 
            CONCAT(c.first_name, ' ', c.last_name) as customer_name,
            SUM(p.amount) as total_spent
        FROM customer c
        JOIN payment p ON c.customer_id = p.customer_id
        GROUP BY c.customer_id, c.first_name, c.last_name
        ORDER BY total_spent DESC
        LIMIT 5
    """)