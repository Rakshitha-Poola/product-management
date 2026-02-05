import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import productRoutes from './routes/product.routes'
import { envConfig } from './config/env.config'

const app = express()

// middlewares
app.use(cors({ origin: envConfig.corsOrigin }))
app.use(express.json())

// routes
app.use('/api', productRoutes)

// database + server start
mongoose
  .connect(envConfig.mongoUri)
  .then(() => {
    console.log('MongoDB connected')

    app.listen(envConfig.port, () => {
      console.log(`Server running on port ${envConfig.port}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error)
  })
