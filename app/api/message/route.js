import ContactUs from '@models/contactUs';
import { connectToDB } from '@utils/database';

export const POST = async (request) => {
  const body = await request.json();
  const { email, name, message } = body

  try {
    await connectToDB();

    const newMessage = await ContactUs.create({ name, email, message}); 

    await newMessage.save();
    return new Response('Message succesfully created', { status: 201 });    
  } catch (error) {
    return new Response("Failed to register user", { status: 500 }); 
  }
}