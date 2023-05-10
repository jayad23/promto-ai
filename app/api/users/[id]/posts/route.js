import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const allPosts = await Prompt.find({ creator: params.id }).populate(
      "creator",
    );
    return new Response(JSON.stringify(allPosts), { status: 200 });
  } catch (error) {
    return new Response("Prompts could not be fetched at this time", {
      status: 401,
    });
  }
};
