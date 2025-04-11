import {PrismaClient} from "@prisma/client"

export const prisma = new PrismaClient();

// import { PrismaClient } from '@prisma/client';

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// const prisma = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== 'production') {
//   globalThis.prisma = prisma; // Prevents multiple instances in development
// }

// export default prisma;