export interface Post {
  id: string;
  title: string;
  body: string | null;
  authorId: string;
  communityId: string;
  isPinned: boolean;
  mediaIds: string[] | null;
  votesCount: number;
  commentsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostWithDetails extends Post {
  author?: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
  community?: {
    id: string;
    name: string;
    slug: string;
    avatarUrl: string | null;
  };
}