import express from 'express'
import { getAllTopics, deleteTopic, addTopic } from '../../Controllers/topicQuestionController.js'
import { verifyToken } from '../../Middleware/auth.js'

const topicsRouter = express.Router()

topicsRouter.get('/all', getAllTopics)
topicsRouter.post('/add', verifyToken(['admin', 'govtOfficial']), addTopic)
topicsRouter.delete('/delete/:topicId', verifyToken(['admin']), deleteTopic)

export default topicsRouter