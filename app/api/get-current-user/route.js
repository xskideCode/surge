import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    // Update session data
    

    // Save updated session data
    //await session.save();

    res.send(session);
  } else {
    res.send("User not authenticated");
  }
}