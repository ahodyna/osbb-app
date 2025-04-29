// TODO: change to Mongodb

export interface User {
  phoneNumber: string;
  password: string;
  token: string;
  isSuperAdmin: boolean;
}

export const users: Record<string, User> = {
  superadmin_token: {
    phoneNumber: '380671111111',
    password: 'admin',
    token: 'superadmin_token',
    isSuperAdmin: true,
  },
};

export interface Message {
  id: number;
  user: string;
  text: string;
  section: string;
  timestamp: Date;
}

export const messages: Message[] = [];
