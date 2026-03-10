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
    cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
    tables = cur.fetchall()
    print("Tables:", tables)
except Exception as e:
    print("Error:", e)
finally:
    if 'conn' in locals() and conn:
        cur.close()
        conn.close()
