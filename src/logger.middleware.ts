import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(
    `${req.method} ${req.url} - start time: ${new Date().toISOString()}`,
  );
  console.time(`Request time of [${req.method}] ${req.url}`);

  res.on('finish', () => {
    console.log(
      `${req.method} ${req.url} - end time: ${new Date().toISOString()}`,
    );
    console.timeEnd(`Request time of [${req.method}] ${req.url}`);
  });
  next();
}
