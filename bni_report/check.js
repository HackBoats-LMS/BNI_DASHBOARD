const mongoose = require("mongoose");

async function check() {
  await mongoose.connect("mongodb+srv://akhilrajuvysyaraju19_db_user:30CD48TIc1H4HH0e@cluster0.knthvtf.mongodb.net/", {dbName: "bni_dashboard"});
  const schema = new mongoose.Schema({}, { strict: false });
  const MemberReport = mongoose.model("MemberReport", schema, "memberreports");
  
  const batch = await MemberReport.findOne({reportType: 'overall'}).sort({createdAt: -1});
  if (batch) {
    const data = await MemberReport.find({uploadBatchId: batch.uploadBatchId}).sort({TYFCB: -1}).limit(10);
    const allData = await MemberReport.find({uploadBatchId: batch.uploadBatchId});
    const totalTYFCB = allData.reduce((sum, item) => sum + (item.TYFCB || 0), 0);
    
    console.log("Total TYFCB:", totalTYFCB, "from", allData.length, "members.");
    console.log("--- Top 10 TYFCB Members ---");
    data.forEach(d => {
      console.log(`${d.fullName}: ${d.TYFCB} (${(d.TYFCB / 100000).toFixed(2)} Lakhs)`);
    });
  }
  process.exit();
}

check().catch(console.error);
