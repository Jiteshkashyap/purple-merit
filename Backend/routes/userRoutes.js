import express from 'express'
import { authMiddleware , authorizeRoles } from '../middleware/authMiddleware.js'
import { validate } from '../middleware/validate.js'
import { userUpdateSchema } from '../validation/userValidation.js'
import { getUserProfile , updateUserProfile } from '../controllers/userController.js'

const router = express.Router();

router.use(authMiddleware)

router.get('/profile',
getUserProfile)

router.put('/update-profile',
authorizeRoles('user','admin','manager'),
validate(userUpdateSchema),
updateUserProfile
)

export default router;