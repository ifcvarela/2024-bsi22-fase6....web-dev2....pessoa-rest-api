import { Router } from "express"
import { refreshToken, verifyToken, createToken } from "../middlewares/token"
const router = Router()
router.post('/', createToken)
router.post('/verify', verifyToken, (req, res) => { res.send('Token is valid') })
router.post('/refresh', refreshToken)
export default router