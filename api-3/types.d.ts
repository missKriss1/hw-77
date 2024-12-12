export interface IMessage {
    author: string;
    message: string;
    image: string | null;
}

export type messagesWithoutId = Omit<IMessage, 'id'>