export interface Notification {
  id: string;
  userId: string;
  type: 'follow' | 'like' | 'comment' | 'answer' | 'mention' | 'system';
  actorId: string | null;
  targetType: string | null;
  targetId: string | null;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface NotificationWithActor extends Notification {
  actor?: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
}