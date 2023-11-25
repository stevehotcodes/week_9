import * as dotenv from "dotenv";

dotenv.config();

export const dbConfig = {
  user: (process.env.DB_USER as string) || "sa",
  password: (process.env.DB_PASSWORD as string) || "Jendaye@23",
  database: (process.env.DB_NAME as string) || "Shoppie",
  server: "localhost",
  pool: {
    max: 10,
    min: 1,
    idleTimeoutMillis: 3000,
  },
  options: {
    encrypt: false,
    trustCertificate: true,
  },
};
