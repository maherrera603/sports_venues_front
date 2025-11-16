export interface IResponse<T = any> {
    code: number;
    status: string;
    message: string;
    data?: T;
}