export type Permission = {
    id?: number;
    name: string;
    description?: string;
};

export type Role = {
    id?: number;
    name: string;
    description?: string;
    permissions?: Permission[];
};

export type User = {
    id?: number;
    userName: string;
    email?: string;
    roles?: Role[];
};