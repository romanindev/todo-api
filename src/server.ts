import { MongoClient } from "mongodb";
import { env } from "./config/env";
import { createApp } from "./app";

async function main() {
  const client = new MongoClient(env.mongoUrl);

  await client.connect();

  const db = client.db(env.mongoDbName);
  const app = createApp(db);

  app.listen(env.port, () => {
    console.log(`todo-api listening on port ${env.port}`);
    console.log(`connected to MongoDB database: ${env.mongoDbName}`);
  });
}

main().catch((error) => {
  console.error("failed to start server", error);
  process.exit(1);
});
