import { Response } from "express";

export function sendError(
  res: Response,
  stack: any,
  message?: any,
  code?: any
) {
  // Console error
  console.log("Error: ", stack);

  // Return the error
  return res.status(code || 500).json({
    success: false,
    error: {
      code: code || 500,
      timestamp: new Date().toISOString(),
      message: message || "Internal server error!",
      details: stack.toString(),
    },
  });
}
