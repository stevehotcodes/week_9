import dotenv from 'dotenv';

dotenv.config();

export const sqlConfig = {
  user: process.env.DB_USER as string || 'sa',
  password: process.env.DB_PWD as string || 'Omosh123',
  database: process.env.DB_NAME as string || 'Shopie',
  server: 'localhost',
  pool: {
    max: 10,
    min: 0, 
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

