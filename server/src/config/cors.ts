import { CorsOptions } from 'cors';
import { env } from './env';

const allowedOrigins = [
  env.CLIENT_URL,
  'http://localhost:4444',
  'https://publicon.in',
  'https://www.publicon.in',
  /\.publicon\.vercel\.app$/,
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const isAllowed = allowedOrigins.some((allowed) => {
      if (allowed instanceof RegExp) return allowed.test(origin);
      return allowed === origin;
    });
    if (isAllowed) callback(null, true);
    else callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Total-Count', 'X-RateLimit-Limit', 'X-RateLimit-Remaining'],
  maxAge: 86400,
};