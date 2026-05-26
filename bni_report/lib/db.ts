import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please add MONGODB_URI"
  );
}

let isConnected = false;

export async function connectDB() {

  if (isConnected) {
    console.log("Using existing DB connection");
    return;
  }

  try {

    const db =
      await mongoose.connect(
        MONGODB_URI,
        {
          dbName: "bni_dashboard",
        }
      );

    isConnected =
      db.connections[0].readyState === 1;

    console.log("MongoDB Connected");

  } catch (error) {

    console.log(error);

    throw new Error(
      "MongoDB connection failed"
    );
  }
}