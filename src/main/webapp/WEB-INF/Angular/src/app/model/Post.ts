export interface IPost {

  id?: number;
  author: string;
  tags: string[];
  title: string;
  content: string;
  imageUrl?: string;
  numberOfComments?: number;
  numberOfLikes?: number;
  numberOfViews?: number;
  dateTime?: string;
}
