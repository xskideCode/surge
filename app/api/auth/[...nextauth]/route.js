import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials no email or password");
        }
        
        await connectToDB();

        const user = await User.findOne({ email : credentials.email});

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials no user found");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user?.hashedPassword
        );


        if (!isCorrectPassword) {
          throw new Error("Invalid credentials wrong password");
        }

        return user;
      }
    })
  ],
  pages: {
    signIn: '/'
  },
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email
      })

      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ user, profile }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({
          email: (profile && profile.email) || (user && user.email)
        });
        
        //if not, create new user
        if (!userExists) {
          await User.create({
            email: profile.email || user.email,
            username: profile.name,
            image: profile.picture
          }); 
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  }
});

export { handler as GET, handler as POST };
