import { MongoClient } from "npm:mongodb@6.1.0";

async function mongoAccess() {
  const client = new MongoClient("mongodb://127.0.0.1:27017", {
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000,
  });
  await client.connect();
  client.close();
}

if (import.meta.main) {
  mongoAccess()
    .then((e) => console.log("seemed to have worked"))
    .catch((e) => console.error(e));
}
