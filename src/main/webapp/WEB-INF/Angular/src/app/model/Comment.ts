export interface IComment {

  name: string;
  content: string;
  numberOfLikes?: number;
  imageUrl?: string;
  replies?: any;
  postID: number;
  time?: string;
}
