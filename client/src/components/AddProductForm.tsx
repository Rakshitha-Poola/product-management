import { useState } from 'react'
import { createProduct } from '../services/productApi'
import { Product } from '../types/product.types'

interface Props {
  onProductCreated: (product: Product) => void
}

export default function AddProductForm({ onProductCreated }: Props) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [category, setCategory] = useState('ELECTRONICS')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const createdProduct = await createProduct({
      name,
      description: 'New product',
      price: Number(price),
      category,
      stock: Number(stock),
    })

    onProductCreated(createdProduct)

    setName('')
    setPrice('')
    setStock('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded border">
      <h3 className="font-semibold mb-2">Add Product</h3>

      <input
        className="border px-2 py-1 mr-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
        required
      />

      <input
        type="number"
        className="border px-2 py-1 mr-2"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        min="0"
        required
      />

      <input
        type="number"
        className="border px-2 py-1 mr-2"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        placeholder="Stock Quantity"
        min="0"
        required
      />

      <select
        className="border px-2 py-1 mr-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="ELECTRONICS">Electronics</option>
        <option value="CLOTHING">Clothing</option>
        <option value="BOOKS">Books</option>
        <option value="FOOD">Food</option>
      </select>

      <button
        disabled={!name || !price || !stock}
        className="bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-50"
      >
        Add
      </button>
    </form>
  )
}
