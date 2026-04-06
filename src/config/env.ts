export const env = {
  port: Number(process.env.PORT || 3000),
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017",
  mongoDbName: process.env.MONGO_DB_NAME || "todo"
};
