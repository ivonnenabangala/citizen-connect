import express from 'express'
import { addIncident, getAllIncidents, getIncident, deleteIncident } from '../../Controllers/incidentsController.js'
import { verifyToken } from '../../Middleware/auth.js'

const incidentsRouter = express.Router()

incidentsRouter.get('/all', getAllIncidents)
incidentsRouter.get('/incident/:incidentId', getIncident)
incidentsRouter.post('/add', verifyToken(), addIncident)
incidentsRouter.delete('/delete/:incidentId', verifyToken(['admin', 'user']), deleteIncident)

export default incidentsRouter