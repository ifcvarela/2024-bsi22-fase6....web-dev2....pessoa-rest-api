import { Router } from 'express'
import u from '../middlewares/users'
const router = Router()
router.get('/', u.getManyUsers)
router.post('/', u.createUser)
router.put('/:id', u.updateUser)
router.delete('/:id', u.deleteUser)
export default router