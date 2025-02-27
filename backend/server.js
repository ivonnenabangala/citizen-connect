import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors';
import usersRouter from './Routes/users/usersRoutes.js';
import pollsRouter from './Routes/polls/pollsRoutes.js'
import topicsRouter from './Routes/topics/topicsRoutes.js';

const app = express();
app.use(json()); 

app.use(cors({ origin: 'http://localhost:4200', credentials: true }));

app.use(express.urlencoded({ extended: true })); // Parse form data

app.use('/users', usersRouter);
app.use('/polls', pollsRouter)
app.use('/topics', topicsRouter)


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
