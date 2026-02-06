interface Props {
  name: string
  category: string
  minPrice: string
  maxPrice: string
  onNameChange: (v: string) => void
  onCategoryChange: (v: string) => void
  onMinPriceChange: (v: string) => void
  onMaxPriceChange: (v: string) => void
}

export default function FilterPanel({
  name,
  category,
  minPrice,
  maxPrice,
  onNameChange,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
}: Props) {
  const handlePriceRangeChange = (value: string) => {
    switch (value) {
      case 'BELOW_500':
        onMinPriceChange('')
        onMaxPriceChange('500')
        break

      case '500_1000':
        onMinPriceChange('500')
        onMaxPriceChange('1000')
        break

      case '1000_5000':
        onMinPriceChange('1000')
        onMaxPriceChange('5000')
        break

      case 'ABOVE_5000':
        onMinPriceChange('5000')
        onMaxPriceChange('')
        break

      default:
        onMinPriceChange('')
        onMaxPriceChange('')
    }
  }

  const selectedRange = (() => {
    if (maxPrice === '500') return 'BELOW_500'
    if (minPrice === '500' && maxPrice === '1000') return '500_1000'
    if (minPrice === '1000' && maxPrice === '5000') return '1000_5000'
    if (minPrice === '5000' && maxPrice === '') return 'ABOVE_5000'
    return ''
  })()

  return (
    <div className="bg-white border rounded p-4 space-y-4">
      <h3 className="font-semibold">Filter</h3>

      {/* Product Name */}
      <div>
        <label className="text-sm">Product Name</label>
        <input
          className="border w-full px-2 py-1 rounded"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </div>

      {/* Category */}
      <div>
        <label className="text-sm">Category</label>
        <select
          className="border w-full px-2 py-1 rounded bg-white"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">All</option>
          <option value="ELECTRONICS">Electronics</option>
          <option value="CLOTHING">Clothing</option>
          <option value="BOOKS">Books</option>
          <option value="FOOD">Food</option>
        </select>
      </div>

      {/* Price Range Dropdown */}
      <div>
        <label className="text-sm">Price Range</label>
        <select
          className="border w-full px-2 py-1 rounded bg-white"
          value={selectedRange}
          onChange={(e) => handlePriceRangeChange(e.target.value)}
        >
          <option value="">All prices</option>
          <option value="BELOW_500">Below ₹500</option>
          <option value="500_1000">₹500 – ₹1,000</option>
          <option value="1000_5000">₹1,000 – ₹5,000</option>
          <option value="ABOVE_5000">Above ₹5,000</option>
        </select>
      </div>
    </div>
  )
}
