import { getRedis } from '../config/redis';

export class CacheManager {
  static async get<T>(key: string): Promise<T | null> {
    const redis = getRedis();
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  static async set(key: string, value: any, ttlSeconds = 300): Promise<void> {
    const redis = getRedis();
    await redis.setex(key, ttlSeconds, JSON.stringify(value));
  }

  static async del(key: string): Promise<void> {
    const redis = getRedis();
    await redis.del(key);
  }

  static async delPattern(pattern: string): Promise<void> {
    const redis = getRedis();
    const keys = await redis.keys(pattern);
    if (keys.length) await redis.del(...keys);
  }
}