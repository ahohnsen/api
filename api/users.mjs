import dbConnect from "../lib/dbConnect.mjs";
import User from "../models/User.mjs";

await dbConnect();

export default async function handler(request, response) {
  const { method } = request;

  if (method === "GET") {
    response.json(await User.find());
  } else if (method === "POST") {
    const user = await User.create(request.body);
    response.json(user);
  }
}
