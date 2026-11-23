export interface IUser {
    name: string;
    email: string;
    password: string;
    role?: "admin" | "member";
}

export interface LogInCredential {
    email: string,
    password: string
}