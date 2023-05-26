import { useSession } from "next-auth/react";

import User from "@models/user";
import { connectToDB } from "@utils/database";

export const getCurrentUser = async () => {
  try {
    await connectToDB();

    const{ data: session } = useSession();

    const user = await User.findById(session.user.id).populate("channelIds");

    if (!user) return new Response("User Not Found", { status: 404 });

    return new Response(JSON.stringify(user), { status: 200});
  } catch (error) {
    return null;
  }
}