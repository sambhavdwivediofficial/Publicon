export interface Media {
  id: string;
  userId: string;
  bucketPath: string;
  fileName: string;
  mimeType: string;
  size: number;
  width: number | null;
  height: number | null;
  createdAt: Date;
}

export interface SignedMediaToken {
  mediaId: string;
  userId: string;
  exp: number;
}