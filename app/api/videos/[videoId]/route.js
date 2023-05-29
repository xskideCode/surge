import Video from "@models/video";


export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const video = await Video.findById(params.id).populate('channelId').populate('userId');

    if (!video) return new Response("Video Not Found", { status: 404 });

    return new Response(JSON.stringify(video), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};