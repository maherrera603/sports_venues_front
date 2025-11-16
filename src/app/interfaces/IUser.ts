export interface IUser {
    id: string | number;
    name: string;
    lastname: string;
    phone: string;
    email: string;
    role: string;
}

export interface ISignUp {
    name: string;
    lastname: string;
    phone: string;
    email: string
    password: string;
}



export interface ISignIn {
    email: string;
    password: string;
}