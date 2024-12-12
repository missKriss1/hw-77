export interface IMessages {
  id: string;
  author: string;
  message: string;
  image: string | null;
}

export interface IMessagesMutation {
  author: string;
  message: string;
  image: File | null;
}