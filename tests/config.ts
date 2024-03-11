import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import prisma from '../src/commons/prisma-client';

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

jest.mock('../src/commons/prisma-client.ts', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  //   mockReset(prismaMock);
});
