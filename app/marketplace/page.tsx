import { getMarketplaceItems } from '@/lib/cosmic'
import { MarketplaceItem } from '@/types'
import ProductCard from '@/components/ProductCard'
import ShoppingCart from '@/components/ShoppingCart'

export default async function MarketplacePage() {
  const items = await getMarketplaceItems() as MarketplaceItem[]
  
  return (
    <div className="min-h-screen bg-gray-50">
      <ShoppingCart />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Marketplace</h1>
          <p className="text-xl text-gray-600">
            Browse our curated selection of premium dog products, toys, and accessories. Find everything your furry friend needs!
          </p>
        </div>
        
        {items.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-lg">No marketplace items found.</p>
            <p className="text-gray-500 mt-2">Check back soon for new products!</p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{items.length}</span> products
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <ProductCard key={item.id} product={item} type="marketplace" />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}