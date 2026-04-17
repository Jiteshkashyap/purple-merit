import express from 'express'
import { registerController, loginController , refreshTokenController, logout } from '../controllers/authController.js'
import { registerSchema , loginSchema } from '../validation/authValidation.js'
import { validate } from '../middleware/validate.js'

const router = express.Router()


router.post('/register' ,
validate(registerSchema),
registerController)

router.post('/login' ,
validate(loginSchema),
loginController)

router.post('/refresh-token' , refreshTokenController)
router.post('/logout', logout)

export default router;