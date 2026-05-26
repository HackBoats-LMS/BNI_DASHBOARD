import memberReport from "@/models/memberReport";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
    await connectDB();
    const latestDoc = await memberReport.findOne().sort({ createdAt: -1 });
    let data = [];
    
    if (latestDoc && latestDoc.uploadBatchId) {
        data = await memberReport.find({ uploadBatchId: latestDoc.uploadBatchId });
    } else {
        // Fallback for legacy data before uploadBatchId was introduced
        data = await memberReport.find();
    }
    
    return NextResponse.json({ data });
}