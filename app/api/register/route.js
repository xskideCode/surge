import bcrypt from 'bcryptjs';
import User from '@models/user';
import { connectToDB } from '@utils/database';

export const POST = async (request) => {
  const body = await request.json();
  const { email, name, password } = body

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    await connectToDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) return new Response("User already exists", { status: 400 });

    const user = await User.create({ email, hashedPassword, username: name}); 

    await user.save();
    return new Response(JSON.stringify(user), { status: 201 });    
  } catch (error) {
    return new Response(error, { status: 500 }); 
  }
}