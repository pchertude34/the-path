// import NextAuth from "next-auth/next";
// import Providers from 'next-auth/providers';
// import Adapters from 'next-auth/adapters';
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default function(req, res) {
//   return NextAuth(req, res, {
//     session:  {
//       jwt: true
//     },
//     secret: process.env.JWT_SECRET,
//     adapter: Adapters.Prisma.Adapter({ prisma }),
//     pages: {
//       signIn: "/admin/signin"
//     },
//     callbacks: {
//       async session(session, user) {
//         if (user) {
//           session.user.userId = user.userId;
//         }
//       }
//     }
//   })
// }
