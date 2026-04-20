import { ShareRepository } from '../repositories/share.repository';
import { getIO } from '../realtime/realtimeServer';

export class ShareService {
  static async share(userId: string, targetType: string, targetId: string, platform?: string) {
    await ShareRepository.create(userId, targetType, targetId, platform);
    const count = await ShareRepository.getSharesCount(targetType, targetId);

    const io = getIO();
    io.to(`${targetType}:${targetId}`).emit('share_updated', {
      targetType,
      targetId,
      newCount: count,
    });

    return { shared: true, count };
  }

  static async getShareCount(targetType: string, targetId: string) {
    return ShareRepository.getSharesCount(targetType, targetId);
  }
}