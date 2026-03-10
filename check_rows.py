import psycopg2

DB_CONFIG = {
    "dbname": "gameloz",
    "user": "postgres",
    "password": "root",
    "host": "localhost",
    "port": "5432"
}

try:
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()
    cur.execute("SELECT id, app_id, name FROM apps LIMIT 2;")
    print("Sample apps:", cur.fetchall())
except Exception as e:
    print("Error:", e)
finally:
    if 'conn' in locals() and conn:
        cur.close()
        conn.close()
