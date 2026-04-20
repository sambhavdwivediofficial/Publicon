export interface LikeEvent {
  targetType: string;
  targetId: string;
  newCount: number;
  userId: string;
}

export interface ShareEvent {
  targetType: string;
  targetId: string;
  newCount: number;
}

export interface FollowEvent {
  followingId: string;
  newCount: number;
}

export interface CommentEvent {
  targetType: string;
  targetId: string;
  comment: any;
}