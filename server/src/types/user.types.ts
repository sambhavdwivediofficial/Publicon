export interface User {
  id: string;
  email: string;
  name: string;
  username: string | null;
  bio: string | null;
  avatarUrl: string | null;
  coverUrl: string | null;
  location: string | null;
  website: string | null;
  credibilityScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  followersCount: number;
  followingCount: number;
  isFollowing?: boolean;
}