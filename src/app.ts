import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  }),
);
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Miracle pilot project start successfully.');
});

// handle global error
app.use(globalErrorHandler);
app.use(notFound);
export default app;
