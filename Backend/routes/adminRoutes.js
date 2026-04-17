import express from 'express'
import { getAllUsersContoller ,getUser , createUserController, updateUserController ,deleteUser,getDashboardController } from '../controllers/adminController.js'
import { createUserSchema , updateUserSchema } from '../validation/adminValidation.js'
import { authMiddleware , authorizeRoles } from '../middleware/authMiddleware.js'
import { validate } from '../middleware/validate.js'


const router = express.Router()

router.use(authMiddleware)

router.post('/create' , 
authorizeRoles('admin'),
validate(createUserSchema),
createUserController)

router.get('/users',
authorizeRoles('admin', 'manager') ,
getAllUsersContoller)

router.get('/user/:id',
authorizeRoles('admin','manager'),
getUser
)

router.put('/update/:id',
authorizeRoles('admin','manager'),
validate(updateUserSchema),
updateUserController
)

router.patch('/delete/:id',
authorizeRoles('admin'),
deleteUser
)
router.get("/dashboard",
authorizeRoles("admin" , 'manager'), 
getDashboardController);

export default router