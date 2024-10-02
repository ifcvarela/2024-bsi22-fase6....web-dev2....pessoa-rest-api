import { connect } from '../database'
import { RequestHandler } from "express"

const getManyUsers: RequestHandler = async (req, res) => {
  const db = await connect()
  const users = await db.all('SELECT * FROM users')
  res.json(users)
}

const createUser: RequestHandler = async (req, res) => {
  const db = await connect()
  const { name, email } = req.body
  const result = await db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email])
  const user = await db.get('SELECT * FROM users WHERE id = ?', [result.lastID])
  res.json(user)
}

const updateUser: RequestHandler = async (req, res) => {
  const db = await connect()
  const { name, email } = req.body
  const { id } = req.params
  await db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id])
  const user = await db.get('SELECT * FROM users WHERE id = ?', [id])
  res.json(user)
}

const deleteUser: RequestHandler = async (req, res) => {
  const db = await connect()
  const { id } = req.params
  await db.run('DELETE FROM users WHERE id = ?', [id])
  res.json({ message: 'User deleted' })
}

export default { 
  getManyUsers, 
  createUser, 
  updateUser, 
  deleteUser 
}