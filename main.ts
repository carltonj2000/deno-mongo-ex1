import { MongoClient } from "npm:mongodb@6.1.0";
import { escape } from "node:querystring";

async function mongoAccess(connectionString: string) {
  const client = new MongoClient(connectionString, {
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000,
  });
  await client.connect();
  client.close();
}

if (import.meta.main) {
  let connectionStr = "mongodb://127.0.0.1:27017";
  if (Deno.args[0] && Deno.args[0] === "app") {
    const user = Deno.env.get("MONGO_USER") || null;
    const password = Deno.env.get("MONGO_PASSWORD") || null;
    const db = Deno.env.get("MONGO_DB") || null;
    if (!user || !password || !db) {
      console.error("User, password or db not found in env file.");
      Deno.exit(-1);
    }
    const pwEsc = escape(password);
    connectionStr = `mongodb://${user}:${pwEsc}@127.0.0.1:27017/${db}`;
  }
  mongoAccess(connectionStr)
    .then(() => console.log("seemed to have worked"))
    .catch((e) => console.error(e));
}
