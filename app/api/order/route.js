import Order from "@models/order";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const body = await request.json();
  const { userId, id, links, payer, purchase_units, payment_source, status } =
    body;

  try {
    await connectToDB();

    const existingOrder = await Order.findOne({ id });

    if (existingOrder)
      return new Response("Order already exist.", { status: 400 });

    const order = await Order.create({
      userId,
      id,
      links,
      payer,
      purchase_units,
      payment_source,
      status,
    });

    await order.save();

    return new Response("Successfully created the Order", { status: 201 });
  } catch (error) {
    return new Response("Failed to register user", { status: 500 });
  }
};
