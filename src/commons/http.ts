import express from 'express';

export const CORS = (_req: express.Request, res: express.Response, next: express.NextFunction): void => {
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
};
