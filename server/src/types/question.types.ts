export interface Question {
  id: string;
  title: string;
  body: string;
  authorId: string;
  communityId: string | null;
  isAnonymous: boolean;
  tags: string[];
  viewsCount: number;
  answersCount: number;
  votesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionWithAuthor extends Question {
  author?: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
}