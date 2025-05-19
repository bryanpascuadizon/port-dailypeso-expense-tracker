import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
    };
  }

  interface User {
    /** Custom user properties returned from your adapter or credentials callback */
    id?: string;
    name?: string | null;
    email?: string | null;
  }
}
