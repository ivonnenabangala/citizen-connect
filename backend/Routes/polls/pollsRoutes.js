import express from 'express'
import {getAllPolls, addPoll, updatePoll, updatePollVotes, deletePoll} from '../../Controllers/pollsController.js'
import { verifyToken } from '../../Middleware/auth.js'

const pollsRouter = express.Router()

pollsRouter.get('/all', getAllPolls)
pollsRouter.post('/add', verifyToken(['admin', 'govtOfficial']), addPoll)
// pollsRouter.patch('/edit/:id', verifyToken(['admin', 'govtOfficial']), updatePoll)
pollsRouter.delete('/delete/:id', verifyToken(['admin']), deletePoll)
pollsRouter.patch('/votes/:id', verifyToken(), updatePollVotes)

export default pollsRouter