export interface Community {
  id: string;
  name: string;
  slug: string;
  description: string;
  avatarUrl: string | null;
  coverUrl: string | null;
  isPrivate: boolean;
  rules: string[] | null;
  tags: string[] | null;
  createdBy: string;
  membersCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommunityMember {
  id: string;
  communityId: string;
  userId: string;
  role: 'member' | 'moderator' | 'admin';
  createdAt: Date;
}