from database import get_connection

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS predictions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        date_time TEXT,
        prediction INTEGER,
        confidence REAL
    )
    """)

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()