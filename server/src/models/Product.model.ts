import mongoose, { Schema, Document } from 'mongoose'
import { ProductCategory } from '../constants/app.constants'

export interface ProductDocument extends Document {
  name: string
  description: string
  price: number
  category: ProductCategory
  stock: number
  createdAt: Date
}

const ProductSchema = new Schema<ProductDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      enum: Object.values(ProductCategory),
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
)

export const Product = mongoose.model<ProductDocument>(
  'Product',
  ProductSchema
)
