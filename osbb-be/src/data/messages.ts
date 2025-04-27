interface Message {
  id: number;
  user: string;
  text: string;
  section: string;
  timestamp: Date;
}

export const messages: Message[] = [];
