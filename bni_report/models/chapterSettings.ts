import mongoose from "mongoose";

const chapterSettingsSchema = new mongoose.Schema({
  chapterName: { type: String, default: "Infinity Chapter" },
  monthYear: { type: String, default: "Jan – May 2025" },
  meetingsCount: { type: String, default: "23" },
}, { timestamps: true });

delete mongoose.models.ChapterSettings;
export default mongoose.model("ChapterSettings", chapterSettingsSchema);
