import GoogleProvider from "next-auth/providers/google";
import User from "./models/User";
import connectToDb from "./dbConnection";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
  jwt: {},
  callbacks: {
    async signIn(user) {
      // console.log(user);
      if (user.account.provider === "google") {
        connectToDb();
        try {
          const existingUser = await User.findOne({
            email: user.profile.email,
          });

          if (!existingUser) {
            const newUser = await new User({
              userId: user.user.id,
              name: user.user.name,
              email: user.user.email,
            });
            await newUser.save();
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    },
    //added jwt and session from chatGPT
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // Store the user ID in the JWT token
        token.id = profile.sub; // Google ID is in profile.sub
        token.email = profile.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Add the user ID to the session object
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return "/";
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
