import type { Response } from "express";

type TResponse<T> = {
    statusCode: number;
    success: boolean;
    message: string;
    data?: T;
    error?: any;
    total?: number;
}

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
        error: data.error,
        total: data.total
    })
}

export default sendResponse;