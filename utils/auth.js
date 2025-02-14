import User from "@/models/User";
import connectDb from "./db";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        console.log("Authorize called with credentials:", credentials);
        await connectDb();

        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        const user = await User.findOne({ email }).select("+password");
        console.log("User found:", user);

        if (!user) {
          throw new Error("Invalid email or password");
        }

        if (!user.password) {
          throw new Error("This account uses Google Sign-In");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Invalid Password");
        }

        return { id: user._id, email: user.email, name: user.name, image: user.image };
      },
    }),
  ],
  callbacks: {
    // 
    async signIn({ user, account }) {
      console.log("SignIn called:", user, account);

      await connectDb();

      let existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        if (account.provider == "google") {
          existingUser = new User({
            email: user.email,
            name: user.name || "Google User",
            image: user.image || "",
            // password: null , 
            role: "user",
          });
          await existingUser.save();
        } else {
          throw new Error("User not found. Please register first.");
        }
      }
      return true;
    },
    // 
    async jwt({ token, user, account }) {
      console.log("JWT called:", token, user);

      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }

      await connectDb();

      const userByEmail = await User.findOne({ email: token.email });

      if (!userByEmail) {
        if (account?.provider === "google") {
          const newUser = new User({
            email: token.email,
            name: token.name || "Google User",
            image: token.picture || "",
            password: undefined,
          });
          await newUser.save();
          token.user = {
            id: newUser._id.toString(),
            email: newUser.email,
            name: newUser.name,
            image: newUser.image,
            role: newUser.role,
          };
        } else {
          throw new Error("User not found");
        }
      } else {
        token.user = {
          id: userByEmail._id.toString(),
          email: userByEmail.email,
          name: userByEmail.name,
          image: userByEmail.image,
          role: userByEmail.role,
        };
      }

      return token;
    },
    // 
    async session({ session, token }) {
      console.log("Session called:", session);
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
