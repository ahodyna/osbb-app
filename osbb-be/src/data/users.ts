interface User {
    phoneNumber: string;
    token: string;
}

export const users: Record<string, User> = {};

// Додати супер-адміна
users['superadmin-token'] = { phoneNumber: '0000000000' };
