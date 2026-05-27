import Navbar from "./components/Navbar";
import DashboardHeader from "./components/DashboardHeader";
import ChapterScorecard from "./components/ChapterScorecard";
import MonthlyScorecard from "./components/MonthlyScorecard";
import OverallReport from "./components/OverallReport";
import Table from "./components/Table";
import Recognition from "./components/Recognition";
import ScoringParameters from "./components/ScoringParameters";
import { unstable_cache } from "next/cache";
import { connectDB } from "@/lib/db";
import MemberReport from "@/models/memberReport";
import MonthlyReport from "@/models/monthlyReport";
import ChapterSettings from "@/models/chapterSettings";

export const getCachedChapterSettings = unstable_cache(
  async () => {
    try {
      await connectDB();
      const settings = await ChapterSettings.findOne().sort({ createdAt: -1 }).lean();
      if (!settings) return null;
      return {
        ...settings,
        _id: settings._id?.toString(),
        createdAt: settings.createdAt?.toString(),
        updatedAt: settings.updatedAt?.toString()
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  ['chapter-settings-cache-key'],
  { tags: ['chapter-settings'], revalidate: 31536000 }
);

const getCachedData = async (type: string = 'overall') => {
  return unstable_cache(
    async () => {
      try {
        await connectDB();
        const Model = type === 'monthly' ? MonthlyReport : MemberReport;
        const query = type === 'overall' 
          ? { $or: [{ reportType: 'overall' }, { reportType: { $exists: false } }] }
          : { reportType: type };

        const latestDoc = await Model.findOne(query).sort({ createdAt: -1 }).lean();
        let data = [];
        if (latestDoc && latestDoc.uploadBatchId) {
          data = await Model.find({ uploadBatchId: latestDoc.uploadBatchId }).lean();
        } else {
          data = await Model.find(query).lean();
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
    [`excel-data-cache-key-v2-${type}`],
    { tags: ['excel-data'] }
  )();
};

export default async function Home() {
  const data = await getCachedData('overall');
  const monthlyData = await getCachedData('monthly');
  const chapterData = await getCachedChapterSettings();

  return (
    <main className="min-h-screen bg-[#f9fafb] overflow-x-hidden">
      <Navbar chapterData={chapterData} />
      <div className="w-full max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8 font-sans pb-0">
        <DashboardHeader data={data} chapterData={chapterData} />
        <ChapterScorecard data={data} chapterData={chapterData} />
        {monthlyData && monthlyData.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <MonthlyScorecard data={monthlyData} chapterData={chapterData} title="Monthly Scorecard" />
          </div>
        )}
        <OverallReport data={data} chapterData={chapterData} />
      </div>
      <Table initialData={data} chapterData={chapterData} />
      <Recognition monthlyData={monthlyData} chapterData={chapterData} />
      <ScoringParameters />
    </main>
  );
}
