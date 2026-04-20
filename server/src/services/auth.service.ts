import { firebaseAuth } from '../config/firebase';
import { UserRepository } from '../repositories/user.repository';
import { generateSessionToken, SessionPayload } from '../utils/jwtManager';
import { AppError } from '../middleware/errorHandler';

export class AuthService {
  static async googleLogin(idToken: string) {
    try {
      const decodedToken = await firebaseAuth.verifyIdToken(idToken);
      const { email, uid, name, picture } = decodedToken;

      if (!email) throw new AppError('Email not provided by Google', 400);

      const user = await UserRepository.upsertUser({
        id: uid,
        email,
        name: name || email.split('@')[0],
        avatar_url: picture || null,
      });

      const payload: SessionPayload = {
        userId: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatar_url,
      };

      const token = generateSessionToken(payload);
      return { token, user: payload };
    } catch (error: any) {
      // Log the actual error
      console.error('Auth Service Error:', error);
      // Forward the real error message if it's an AppError, else generic
      if (error instanceof AppError) throw error;
      throw new AppError(error.message || 'Authentication failed', 500);
    }
  }
}