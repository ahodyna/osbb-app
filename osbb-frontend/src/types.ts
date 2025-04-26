export interface User {
    id: string;
    phone: string;
    isSuperAdmin: boolean;
}

export interface Request {
    id: string;
    userId: string;
    message: string;
    beautifiedMessage: string;
}
