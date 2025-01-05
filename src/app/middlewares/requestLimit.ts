import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

// Rate limit middleware function
const createHistoryLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 5, // Limit each IP to 1 request per minute
  message: 'Too many requests, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Middleware function with TypeScript annotations
export const actionRequestLimiter = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return createHistoryLimiter(req, res, next);
};
