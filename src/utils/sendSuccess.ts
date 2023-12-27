import { Response } from "express";

export function sendSuccess(
  res: Response,
  message: any,
  data: any,
  code?: any
) {
  return res.status(code || 200).json({
    success: true,
    code: code || 500,
    message,
    ...(data ? { data } : null),
  });
}
