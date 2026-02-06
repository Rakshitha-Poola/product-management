import { useState } from 'react'
import { fetchProducts } from '../services/productApi'
import { Product } from '../types/product.types'

export const useInfiniteProducts = (
  initialProducts: Product[],
  initialCursor: string | null,
  initialHasMore: boolean
) => {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [cursor, setCursor] = useState<string | null>(initialCursor)
  const [hasMore, setHasMore] = useState<boolean>(initialHasMore)
  const [loading, setLoading] = useState<boolean>(false)

  const loadMore = async () => {
    if (!hasMore || loading) return

    setLoading(true)

    const response = await fetchProducts(cursor ?? undefined)

    setProducts((prev) => {
      const existingIds = new Set(prev.map((p) => p._id))
      const newProducts = response.data.filter(
        (p) => !existingIds.has(p._id)
      )
      return [...prev, ...newProducts]
    })

    setCursor(response.pagination.nextCursor)
    setHasMore(response.pagination.hasMore)

    setLoading(false)
  }

  /** ✅ Optimistic add with safe deduplication */
  const addProductToList = (product: Product) => {
    setProducts((prev) => {
      if (prev.some((p) => p._id === product._id)) {
        return prev
      }
      return [product, ...prev]
    })
  }

  return {
    products,
    loadMore,
    hasMore,
    loading,
    addProductToList,
  }
}
