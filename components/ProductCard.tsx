'use client'

import { MarketplaceItem, DogFoodProduct } from '@/types'
import { ShoppingCart, Info } from 'lucide-react'
import { useState } from 'react'

interface ProductCardProps {
  product: MarketplaceItem | DogFoodProduct
  type: 'marketplace' | 'food'
  onAddToCart?: (product: MarketplaceItem | DogFoodProduct) => void
}

export default function ProductCard({ product, type, onAddToCart }: ProductCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const isMarketplace = type === 'marketplace'
  const metadata = product.metadata as any
  
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product)
    } else {
      // Fallback to localStorage if no callback provided
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const existingItem = cart.find((item: any) => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        cart.push({
          id: product.id,
          name: isMarketplace ? metadata.item_name : metadata.product_name,
          price: metadata.price,
          quantity: 1,
          image: metadata.product_image?.imgix_url,
          type: type
        })
      }
      
      localStorage.setItem('cart', JSON.stringify(cart))
      
      // Dispatch custom event for cart update
      window.dispatchEvent(new Event('cartUpdated'))
    }
  }
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {metadata.product_image && (
        <div className="relative h-48">
          <img 
            src={`${metadata.product_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={isMarketplace ? metadata.item_name : metadata.product_name}
            className="w-full h-full object-cover"
          />
          {isMarketplace && metadata.in_stock !== undefined && (
            <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${
              metadata.in_stock ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}>
              {metadata.in_stock ? 'In Stock' : 'Out of Stock'}
            </div>
          )}
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">
          {isMarketplace ? metadata.item_name : metadata.product_name}
        </h3>
        
        {metadata.brand && (
          <p className="text-sm text-gray-600 mb-2">by {metadata.brand}</p>
        )}
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-blue-600">
            ${metadata.price.toFixed(2)}
          </span>
          
          {metadata.category && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {metadata.category.value}
            </span>
          )}
        </div>
        
        {metadata.description && (
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {metadata.description}
          </p>
        )}
        
        {!isMarketplace && metadata.weight && (
          <p className="text-sm text-gray-600 mb-2">Weight: {metadata.weight}</p>
        )}
        
        {!isMarketplace && metadata.food_type && (
          <p className="text-sm text-gray-600 mb-2">Type: {metadata.food_type.value}</p>
        )}
        
        {!isMarketplace && metadata.size_category && metadata.size_category.length > 0 && (
          <p className="text-sm text-gray-600 mb-4">
            Suitable for: {metadata.size_category.join(', ')}
          </p>
        )}
        
        {isMarketplace && metadata.suitable_for_breeds && metadata.suitable_for_breeds.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-1">Suitable for:</p>
            <div className="flex flex-wrap gap-1">
              {metadata.suitable_for_breeds.slice(0, 3).map((breed: any) => (
                <span key={breed.id} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                  {breed.title}
                </span>
              ))}
              {metadata.suitable_for_breeds.length > 3 && (
                <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs">
                  +{metadata.suitable_for_breeds.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={isMarketplace && !metadata.in_stock}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
              isMarketplace && !metadata.in_stock
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Info size={18} />
          </button>
        </div>
        
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-semibold mb-2">Additional Information</h4>
            {!isMarketplace && metadata.nutritional_info && (
              <div 
                className="text-sm text-gray-700 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: metadata.nutritional_info }}
              />
            )}
            {isMarketplace && metadata.description && (
              <p className="text-sm text-gray-700">{metadata.description}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}