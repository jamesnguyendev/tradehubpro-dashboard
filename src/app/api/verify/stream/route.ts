import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";

export async function GET(req: Request) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const verify = searchParams.get("verify");

  const stream = new ReadableStream({
    async start(controller) {
      const changeStream = User.watch([], { fullDocument: "updateLookup" });

      changeStream.on("change", (change) => {
        if (verify && change.fullDocument?.verify !== verify) return;

        controller.enqueue(`data: ${JSON.stringify(change)}\n\n`);
      });

      changeStream.on("error", (err) => {
        console.error("Change stream error:", err);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
