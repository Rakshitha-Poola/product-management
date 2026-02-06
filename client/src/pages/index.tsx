import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { fetchProducts } from '../services/productApi'
import { Product } from '../types/product.types'
import { useInfiniteProducts } from '../hooks/useInfiniteProducts'
import ProductTable from '../components/ProductTable'
import FilterPanel from '../components/FilterPanel'
import AddProductForm from '../components/AddProductForm'

interface HomeProps {
  initialData: {
    data: Product[]
    pagination: {
      nextCursor: string | null
      hasMore: boolean
    }
  }
}

export default function Home({ initialData }: HomeProps) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const resetFilters = () => {
  setName('')
  setCategory('')
  setMinPrice('')
  setMaxPrice('')
}


  const {
    products,
    loadMore,
    hasMore,
    loading,
    addProductToList,
  } = useInfiniteProducts(
    initialData.data,
    initialData.pagination.nextCursor,
    initialData.pagination.hasMore
  )

  const filtered = products.filter((p) => {
    const matchName = p.name.toLowerCase().includes(name.toLowerCase())
    const matchCategory = category ? p.category === category : true
    const matchMin = minPrice ? p.price >= Number(minPrice) : true
    const matchMax = maxPrice ? p.price <= Number(maxPrice) : true
    return matchName && matchCategory && matchMin && matchMax
  })

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="bg-white border-b px-6 py-4">
        <h1 className="text-xl font-semibold text-black">
          Product Management
        </h1>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* ✅ IMPORTANT: pass callback so UI updates immediately */}
        <AddProductForm onProductCreated={addProductToList} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-3">
            <ProductTable
  products={filtered}
  onShowAll={resetFilters}
/>

            {hasMore && (
              <button
                onClick={loadMore}
                disabled={loading}
                className="mt-4 px-5 py-2 bg-blue-600 text-white rounded"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            )}
          </div>

          <FilterPanel
            name={name}
            category={category}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onNameChange={setName}
            onCategoryChange={setCategory}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
          />
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchProducts()
  return { props: { initialData: data } }
}
