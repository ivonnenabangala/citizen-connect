import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors';
import usersRouter from './Routes/users/usersRoutes.js';
import pollsRouter from './Routes/polls/pollsRoutes.js'
import topicsRouter from './Routes/topics/topicsRoutes.js';
import opinionsRouter from './Routes/opinions/opinionsRoutes.js'
import documentsRouter from './Routes/documents/documentsRoutes.js'
import incidentsRouter from './Routes/incidents/incidentsRoutes.js'

const app = express();
app.use(json()); 

app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(express.json())
app.use(express.urlencoded({ extended: true })); // Parse form data

app.use('/users', usersRouter);
app.use('/polls', pollsRouter)
app.use('/topics', topicsRouter)
app.use('/opinions', opinionsRouter)
app.use('/documents', documentsRouter)
app.use('/incidents', incidentsRouter)


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
