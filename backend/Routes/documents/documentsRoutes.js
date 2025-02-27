import express from 'express'
import { addDocument, getDocument, getAllDocuments, deleteDocument } from '../../Controllers/documentsController.js'
import { verifyToken } from '../../Middleware/auth.js'

const documentsRouter = express.Router()

documentsRouter.get('/all', getAllDocuments)
documentsRouter.get('/document/:documentId', getDocument)
documentsRouter.post('/add', verifyToken(['admin']), addDocument)
documentsRouter.delete('/delete/:documentId', verifyToken(['admin']), deleteDocument)

export default documentsRouter