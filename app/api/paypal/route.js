import fetch from "node-fetch";

const { PAYPAL_CLIENT_ID, PAYPAL_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";

export async function POST(req, res) {
  const body = await req.json();
  const { orderID, product } = body;
  if (orderID) {
    const result = await capturePayment(orderID);
    return new Response(JSON.stringify(result), { status: 200 }); 
    //res.status(200).json(result);
  } else {
    const result = await createOrder(product);
    return new Response(JSON.stringify(result), { status: 200 }); 
    //res.status(200).json(result);
  }
}

async function createOrder(product) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: product.cost,
          },
          description: product.description
        },
      ],
    }),
  });

  return handleResponse(response);
}

async function capturePayment(orderID) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse(response);
}

async function generateAccessToken() {
  const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_SECRET).toString("base64");
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  const jsonData = await handleResponse(response);
  return jsonData.access_token;
}

async function handleResponse(response) {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}