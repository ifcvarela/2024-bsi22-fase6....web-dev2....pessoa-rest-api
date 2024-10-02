import { open, Database } from 'sqlite'
import sqlite3 from 'sqlite3'

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
      email TEXT
    )
  `)

  instance = db
  return db
}