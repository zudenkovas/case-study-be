import express, { ErrorRequestHandler, json } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { CORS } from './commons';
import healthRoute from './routes/health';
import customerRoute from './routes/customers';
import bankAccountRoute from './routes/bank-accounts';
import currencyRoute from './routes/currency';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(helmet());
app.use(json());
app.use(CORS);

app.use('/health', healthRoute);
app.use('/customers', customerRoute);
app.use('/currency', currencyRoute);
app.use('/bank-accounts', bankAccountRoute);

const errorLogger: ErrorRequestHandler = (err, _req, _res, next) => {
  console.error(err.stack);
  next(err);
};
app.use(errorLogger);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  res.status(500).json({ error: err.errors || err.message || 'Unknown Error' });
};
app.use(errorHandler);

app.use((_req: express.Request, res: express.Response) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});

export default app;
