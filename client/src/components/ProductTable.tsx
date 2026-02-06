import { Product } from '../types/product.types'

interface Props {
  products: Product[]
  onShowAll?: () => void
}

export default function ProductTable({ products, onShowAll }: Props) {
  return (
    <div className="bg-white text-black border rounded">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 text-left">Product Name</th>
            <th className="border px-3 py-2 text-left">Category</th>
            <th className="border px-3 py-2 text-right">Price</th>
            <th className="border px-3 py-2 text-right">Stock</th>
            <th className="border px-3 py-2 text-left">Created</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="border px-3 py-6 text-center text-gray-600"
              >
                <p className="mb-3 font-medium">
                  No products available
                </p>

                {onShowAll && (
                  <button
                    onClick={onShowAll}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Show All Products
                  </button>
                )}
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{product.name}</td>
                <td className="border px-3 py-2">{product.category}</td>
                <td className="border px-3 py-2 text-right">
                  ₹{product.price.toLocaleString()}
                </td>
                <td className="border px-3 py-2 text-right">
                  {product.stock}
                </td>
                <td className="border px-3 py-2">
                  {new Date(product.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
