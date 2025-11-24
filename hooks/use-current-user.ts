import { useSession } from "next-auth/react";

import { auth } from "@/auth"; // from your NextAuth setup (auth.ts)

export const currentUserServer = async () => {
  const session = await auth();
  return session?.user;
};

export const currentUser = () => {
  const session = useSession();
  return session?.data?.user;
};
