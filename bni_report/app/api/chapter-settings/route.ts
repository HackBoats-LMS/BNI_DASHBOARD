import { connectDB } from "@/lib/db";
import ChapterSettings from "@/models/chapterSettings";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    await connectDB();
    let data = await ChapterSettings.findOne().sort({ createdAt: -1 });
    if (!data) {
      data = await ChapterSettings.create({});
    }
    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ success: false, msg: "Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    await ChapterSettings.deleteMany({});
    const newRecord = await ChapterSettings.create(body);

    revalidatePath("/", "page");

    return Response.json({ success: true, data: newRecord });
  } catch (error) {
    return Response.json({ success: false, msg: "Server Error" }, { status: 500 });
  }
}
