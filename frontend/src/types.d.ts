export interface IPostFromDb {
  message: string;
  author: string;
  image: string | null;
  date: string;
  id: string;
}

export interface IPostToSend {
  message: string | null;
  author: string;
}