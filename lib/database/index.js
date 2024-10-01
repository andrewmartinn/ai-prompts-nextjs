import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cachedDB = { conn: null, promise: null };

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (cachedDB.conn) {
    console.log("MongoDB already connected");
    return cachedDB.conn;
  }

  cachedDB.promise =
    cachedDB.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "radius",
      bufferCommands: false,
    });

  try {
    cachedDB.conn = await cachedDB.promise;
    console.log("Connected to mongoDB");
  } catch (error) {
    cachedDB.promise = null;
    throw new Error("Failed to connect to DB");
  }

  return cachedDB.conn;
};
