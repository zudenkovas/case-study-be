import express from 'express';
import { prisma } from '../commons';

export const getHealth = async (_req: express.Request, res: express.Response): Promise<void> => {
  let dbConnected = false;

  try {
    await prisma.$connect();
    dbConnected = true;
    await prisma.$disconnect();
  } catch (err) {
    console.error(err);
    dbConnected = false;
  }

  res.json({
    health: true,
    version: 'v0.0.1',
    dbConnected,
  });
};
