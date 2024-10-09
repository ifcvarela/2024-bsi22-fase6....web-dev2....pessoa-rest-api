import { open, Database } from 'sqlite'
import sqlite3 from 'sqlite3'
import bcrypt from 'bcrypt'

let instance: Database | null = null

export async function connect() {
  if (instance) return instance

  const db = await open({
     filename: 'database.sqlite',
     driver: sqlite3.Database
   })
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT NOT NULL UNIQUE,
      password TEXT
    )
  `)

  const password = await bcrypt.hash('123123', 10)

  await db.exec(`
    INSERT OR REPLACE INTO users (id, name, email, password) 
    VALUES (1, 'Susan Bar', 'susan@mail.com', '${password}')
  `)

  instance = db
  return db
}