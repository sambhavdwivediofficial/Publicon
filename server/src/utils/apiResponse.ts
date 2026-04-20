import { Response } from 'express';

export class ApiResponse {
  static success(res: Response, data: any, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({ success: true, message, data });
  }

  static paginated(
    res: Response,
    data: any[],
    total: number,
    page: number,
    limit: number,
    message = 'Success'
  ) {
    return res.status(200).json({
      success: true,
      message,
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  }

  static error(res: Response, message: string, statusCode = 500, errors?: any) {
    return res.status(statusCode).json({ success: false, message, errors });
  }
}