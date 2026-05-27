import { connectDB } from "@/lib/db";
import MemberReport from "@/models/memberReport";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import MonthlyReport from "@/models/monthlyReport";

export async function GET(req: Request) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const type = url.searchParams.get("type");
    const Model = type === 'monthly' ? MonthlyReport : MemberReport;

    const batches = await Model.aggregate([
      {
        $group: {
          _id: "$uploadBatchId",
          count: { $sum: 1 },
          createdAt: { $first: "$createdAt" },
          reportType: { $first: { $ifNull: ["$reportType", type === 'monthly' ? "monthly" : "overall"] } }
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
    const type = url.searchParams.get("type");
    const Model = type === 'monthly' ? MonthlyReport : MemberReport;
    
    if (!batchId) {
       return NextResponse.json({ success: false, msg: "No batch ID provided" }, { status: 400 });
    }

    if (batchId === "legacy") {
       await Model.deleteMany({ uploadBatchId: { $exists: false } });
       await Model.deleteMany({ uploadBatchId: null });
    } else {
       await Model.deleteMany({ uploadBatchId: batchId });
    }

    revalidatePath("/", "page");

    return NextResponse.json({ success: true, msg: "Batch deleted successfully." });
  } catch (error) {
    return NextResponse.json({ success: false, msg: "Server error" }, { status: 500 });
  }
}
