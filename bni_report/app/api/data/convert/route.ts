
import * as XLSX from "xlsx";
import { transformMemeber } from "./functions";
import { connectDB } from "@/lib/db";
import MemberReport from "@/models/memberReport";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
    try {
        await connectDB();
        const formData = await req.formData();
        const file = formData.get("file");
        
        if (!file || !(file instanceof File)) {
            return Response.json(
                { success: false, msg: "No valid file provided" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        
        // Remove 'Total' rows
        const filteredData = data.filter((row: any) => 
            row["First Name"]?.toString().trim().toLowerCase() !== "total" &&
            row["Last Name"]?.toString().trim().toLowerCase() !== "total"
        );
        
        const batchId = new Date().toISOString();
        const new_data = filteredData.map((row: any) => ({
            ...transformMemeber(row),
            uploadBatchId: batchId
        }));
        await MemberReport.insertMany(new_data);    

        revalidatePath("/", "page");

        return Response.json({ success: true, data: new_data });

    } catch (error) {
        console.log(error);
        return Response.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
    }
}