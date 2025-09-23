import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";

export async function GET() {
  await connectToDatabase();

  const stream = new ReadableStream({
    async start(controller) {
      const changeStream = User.watch([], { fullDocument: "updateLookup" });

      changeStream.on("change", (change) => {
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
