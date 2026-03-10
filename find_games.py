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
    cur.execute("SELECT id, app_id, name FROM apps WHERE name ILIKE '%free fire%' OR name ILIKE '%bgmi%' OR name ILIKE '%call of duty%' OR name ILIKE '%mobile legends%';")
    print("Other apps:", cur.fetchall())
except Exception as e:
    print("Error:", e)
finally:
    if 'conn' in locals() and conn:
        cur.close()
        conn.close()
