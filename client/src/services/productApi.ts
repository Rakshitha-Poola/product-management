import { API_ENDPOINTS } from '../constants/api.constants'
import { Product } from '../types/product.types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string

export interface PaginatedResponse {
  data: Product[]
  pagination: {
    nextCursor: string | null
    hasMore: boolean
  }
}

/** ✅ THIS MUST BE EXPORTED */
export const fetchProducts = async (
  cursor?: string,
  limit = 10
): Promise<PaginatedResponse> => {
  const params = new URLSearchParams()
  if (cursor) params.append('cursor', cursor)
  params.append('limit', String(limit))

  const res = await fetch(
    `${BASE_URL}${API_ENDPOINTS.PRODUCTS}?${params.toString()}`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  return res.json()
}

/** create product API */
export const createProduct = async (productData: {
  name: string
  description: string
  price: number
  category: string
  stock: number
}) => {
  const res = await fetch(`${BASE_URL}${API_ENDPOINTS.PRODUCTS}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  })

  if (!res.ok) {
    throw new Error('Failed to create product')
  }

  return res.json()
}
