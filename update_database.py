import psycopg2
import csv

# 1. Database Connection Details
DB_CONFIG = {
    "dbname": "gameloz",
    "user": "postgres",        # Your pgAdmin username
    "password": "root", # Your pgAdmin password
    "host": "localhost",
    "port": "5432"
}

def update_game_descriptions(csv_file_path):
    conn = None
    try:
        # Connect to your postgres DB
        conn = psycopg2.connect(**DB_CONFIG)
        cur = conn.cursor()

        # 2. Open and read the CSV file
        with open(csv_file_path, mode='r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            
            print("Starting updates...")
            count = 0
            
            for row in reader:
                game_id = row['game_id']
                new_desc = row['new_description']

                # 3. Execute the Update
                # Using %s prevents SQL injection
                sql = "UPDATE apps SET description = %s WHERE id = %s"
                cur.execute(sql, (new_desc, game_id))
                count += 1

        # 4. Commit the changes
        conn.commit()
        print(f"Successfully updated {count} games!")

    except Exception as e:
        print(f"An error occurred: {e}")
        if conn:
            conn.rollback() # Undo changes if something goes wrong
    finally:
        if conn:
            cur.close()
            conn.close()

if __name__ == "__main__":
    update_game_descriptions('game_updates.csv')
