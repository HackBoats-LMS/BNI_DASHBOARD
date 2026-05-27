const mongoose = require("mongoose");

async function check() {
  await mongoose.connect("mongodb+srv://akhilrajuvysyaraju19_db_user:30CD48TIc1H4HH0e@cluster0.knthvtf.mongodb.net/");
  const schema = new mongoose.Schema({}, { strict: false });
  const MemberReport = mongoose.model("MemberReport", schema, "memberreports");
  
  const data = await MemberReport.find({}).sort({createdAt: -1}).limit(1);
  console.log("Member record:", data[0]?.toObject());
  process.exit();
}

check().catch(console.error);
