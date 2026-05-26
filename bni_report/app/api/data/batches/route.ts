import { connectDB } from "@/lib/db";
import MemberReport from "@/models/memberReport";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    await connectDB();
    const batches = await MemberReport.aggregate([
      {
        $group: {
          _id: "$uploadBatchId",
          count: { $sum: 1 },
          createdAt: { $first: "$createdAt" }
        }
      },
      { $sort: { createdAt: -1 } }
    ]);
    return NextResponse.json({ success: true, batches });
  } catch (error) {
    return NextResponse.json({ success: false, msg: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const batchId = url.searchParams.get("batchId");
    
    if (!batchId) {
       return NextResponse.json({ success: false, msg: "No batch ID provided" }, { status: 400 });
    }

    if (batchId === "legacy") {
       await MemberReport.deleteMany({ uploadBatchId: { $exists: false } });
       await MemberReport.deleteMany({ uploadBatchId: null });
    } else {
       await MemberReport.deleteMany({ uploadBatchId: batchId });
    }

    revalidatePath("/", "page");

    return NextResponse.json({ success: true, msg: "Batch deleted successfully." });
  } catch (error) {
    return NextResponse.json({ success: false, msg: "Server error" }, { status: 500 });
  }
}
