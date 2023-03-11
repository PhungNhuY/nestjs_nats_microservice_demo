export interface IResponse{
    status: 'success' | 'error';
    data: object | null;
    error: any[] | null;
    code: number | null;
}