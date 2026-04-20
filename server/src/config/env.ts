import dotenv from 'dotenv';
dotenv.config();

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '8888', 10),
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:4444',

  FIREBASE_PROJECT_ID: requireEnv('FIREBASE_PROJECT_ID'),
  FIREBASE_CLIENT_EMAIL: requireEnv('FIREBASE_CLIENT_EMAIL'),
  FIREBASE_PRIVATE_KEY: requireEnv('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),

  SUPABASE_URL: requireEnv('SUPABASE_URL'),
  SUPABASE_SERVICE_ROLE_KEY: requireEnv('SUPABASE_SERVICE_ROLE_KEY'),

  JWT_SECRET: requireEnv('JWT_SECRET'),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',

  MEDIA_CDN_BASE: requireEnv('MEDIA_CDN_BASE'),
  MEDIA_CDN_SECRET: requireEnv('MEDIA_CDN_SECRET'),
  MEDIA_SIGNED_TOKEN_EXPIRES: process.env.MEDIA_SIGNED_TOKEN_EXPIRES || '60s',

  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
} as const;

export type Env = typeof env;