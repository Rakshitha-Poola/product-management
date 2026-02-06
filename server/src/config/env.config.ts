// server/src/config/env.config.ts

import dotenv from 'dotenv'
import path from 'path'

const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.test'

dotenv.config({
  path: path.resolve(process.cwd(), envFile),
})

// validation (MANDATORY)
if (!process.env.PORT) {
  throw new Error('PORT is missing in environment variables')
}

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is missing in environment variables')
}

if (!process.env.CORS_ORIGIN) {
  throw new Error('CORS_ORIGIN is missing in environment variables')
}

export const envConfig = {
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGODB_URI,
  corsOrigin: process.env.CORS_ORIGIN,
}
