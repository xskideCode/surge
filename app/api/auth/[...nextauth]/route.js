import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import User from "@models/user";
import Account from "@models/user";
import { connectToDB } from "@utils/database";

const tempchannels = []

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: { url: "https://accounts.google.com/o/oauth2/v2/auth", params: { scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.readonly" } },
      async profile(profile, tokens) {
        console.log(tokens);
        const url = 'https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CtopicDetails%2Cstatistics&mine=true';

        const requestOptions = {
          headers: {
            'Authorization': `Bearer ${tokens.access_token}`,
          },
        };

        const response = await fetch(url, requestOptions);

        const data = await response.json();

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          channels: data.items || []
        }
      }
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
            image: profile.picture,
          }); 
        }
        
        if (user.channels) {
          user.channels.map((channel) =>
              tempchannels.push(channel)
              );
            }


        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session, token, user }) {

      const user1 = await User.findOne({ email: token.email, });

      session.user.id = user1._id;
      session.user.channels = tempchannels
      
      return session
    }
  },
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
