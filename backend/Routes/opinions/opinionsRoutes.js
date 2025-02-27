import express from 'express'
import { getAllOpinions, deleteOpinion, addOpinion, getUserOpinionsOnTopic } from '../../Controllers/opinionsController.js'
import { verifyToken } from '../../Middleware/auth.js'

const opinionsRouter = express.Router()

opinionsRouter.get('/all', getAllOpinions)
opinionsRouter.get('/user/opinions', verifyToken(), getUserOpinionsOnTopic)
opinionsRouter.post('/add', verifyToken(), addOpinion)
opinionsRouter.delete('/delete/:opinionId', verifyToken(), deleteOpinion)

export default opinionsRouter