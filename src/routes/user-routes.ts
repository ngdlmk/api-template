import express from 'express'
import userController from '../controllers/user-controller'
import { authenticateToken } from '../utils/accessToken'
const router = express.Router()
router.use(authenticateToken)

router.get('/update-notification-token', userController.getUser)

export default router