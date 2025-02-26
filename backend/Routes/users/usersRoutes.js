import express from 'express'
import {getAllUsers, addUser, updateUser, deleteUser, login} from '../../Controllers/userController.js'

const usersRouter = express.Router()

usersRouter.get('/allUsers', getAllUsers)
usersRouter.post('/addUser', addUser)
usersRouter.patch('/updateUser/:id', updateUser)
usersRouter.delete('/deleteUser/:id', deleteUser)
usersRouter.post('/login', login)

export default usersRouter