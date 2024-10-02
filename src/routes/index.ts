import express, { Router } from 'express'
import users from './users'
const router = Router()
router.use(express.json())
router.use(express.static(__dirname + '/../../public'))
router.use('/users', users)
export default router