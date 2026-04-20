import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
// import { env } from './config/env';
import { corsOptions } from './config/cors';
import { rateLimiter } from './middleware/rateLimit';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { loggerMiddleware } from './middleware/logger';
import routes from './routes';

const app: Application = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.set('trust proxy', 1);
app.use(loggerMiddleware);
app.use(rateLimiter);

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/v1', routes);

app.use(notFound);
app.use(errorHandler);

export default app;