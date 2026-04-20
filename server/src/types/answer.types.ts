export interface Answer {
  id: string;
  body: string;
  questionId: string;
  authorId: string;
  isAnonymous: boolean;
  aiAssisted: boolean;
  votesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnswerWithAuthor extends Answer {
  author?: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
}