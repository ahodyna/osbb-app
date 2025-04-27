interface User {
    phoneNumber: string;
    token: string;
    isSuperAdmin: boolean;
}

export const users: Record<string, User> = {};

