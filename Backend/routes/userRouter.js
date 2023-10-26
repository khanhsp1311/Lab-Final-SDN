import express from 'express'
import { userController } from '../controllers/index.js'

// Khai báo đối tượng Router
const userRouter = express.Router()


userRouter.get('/', userController.findAll)
userRouter.post('/', userController.createOne)
userRouter.get('/:id', userController.findOne)
userRouter.delete('/:id', userController.deleteOne)
// hay bị nhầm tên hàm
userRouter.put('/:id', userController.updateOne)

export default userRouter;