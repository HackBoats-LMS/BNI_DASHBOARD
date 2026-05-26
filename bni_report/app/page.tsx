import Navbar from "./components/Navbar";
import DashboardHeader from "./components/DashboardHeader";
import ChapterScorecard from "./components/ChapterScorecard";
import OverallReport from "./components/OverallReport";
import Table from "./components/Table";
import Recognition, { getCachedTopPerformers } from "./components/Recognition";
import ScoringParameters from "./components/ScoringParameters";
import { unstable_cache } from "next/cache";
import { connectDB } from "@/lib/db";
import MemberReport from "@/models/memberReport";

const getCachedData = unstable_cache(
  async () => {
    try {
      await connectDB();
      const latestDoc = await MemberReport.findOne().sort({ createdAt: -1 }).lean();
      let data = [];
      if (latestDoc && latestDoc.uploadBatchId) {
        data = await MemberReport.find({ uploadBatchId: latestDoc.uploadBatchId }).lean();
      } else {
        data = await MemberReport.find().lean();
      }
      // Serialize to avoid Next.js warning when passing to client components
      return data.map((d: any) => ({
        ...d,
        _id: d._id?.toString(),
        createdAt: d.createdAt?.toString(),
        updatedAt: d.updatedAt?.toString()
      }));
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  ['excel-data-cache-key'],
  { tags: ['excel-data'] }
);

export default async function Home() {
  const data = await getCachedData();
  const topData = await getCachedTopPerformers();

  return (
    <main className="min-h-screen bg-[#f9fafb] overflow-x-hidden">
      <Navbar />
      <div className="w-full max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8 font-sans pb-0">
        <DashboardHeader data={data} topData={topData} />
        <ChapterScorecard data={data} />
        <OverallReport data={data} topData={topData} />
      </div>
      <Table initialData={data} />
      <Recognition />
      <ScoringParameters />
    </main>
  );
}
