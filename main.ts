import { MongoClient } from "npm:mongodb@6.1.0";
import { escape } from "node:querystring";
import mongoose from "npm:mongoose@^6.7";

const getUserPwDb = () => {
  const user = Deno.env.get("MONGO_USER") || null;
  const passwordNoEsc = Deno.env.get("MONGO_PASSWORD") || null;
  const db = Deno.env.get("MONGO_DB") || null;
  if (!user || !passwordNoEsc || !db) {
    console.error("User, password or db not found in env file.");
    Deno.exit(-1);
  }
  const password = escape(passwordNoEsc);
  return { user, password, db };
};

async function mongoAccess(connectionString: string) {
  const client = new MongoClient(connectionString, {
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000,
  });
  await client.connect();
  client.close();
}

async function mongooseAccess(connectionString: string) {
  const conn = await mongoose.connect(connectionString, {
    serverSelectionTimeoutMS: 5000,
  });
  await conn.disconnect();
}

if (import.meta.main) {
  let connectionStr = "mongodb://127.0.0.1:27017";
  const { user, password, db } = getUserPwDb();
  if (Deno.args[0] && Deno.args[0] === "app") {
    connectionStr = `mongodb://${user}:${password}@127.0.0.1:27017/${db}`;
  }
  if (Deno.args[1] && Deno.args[1] === "mongoose") {
    mongooseAccess(connectionStr)
      .then(() => console.log("mongoose seemed to have worked"))
      .catch((e) => console.error(e));
  } else {
    mongoAccess(connectionStr)
      .then(() => console.log("mongo seemed to have worked"))
      .catch((e) => console.error(e));
  }
}
