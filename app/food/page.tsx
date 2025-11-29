import { getDogFoodProducts } from '@/lib/cosmic'
import { DogFoodProduct } from '@/types'
import ProductCard from '@/components/ProductCard'
import ShoppingCart from '@/components/ShoppingCart'

export default async function FoodPage() {
  const products = await getDogFoodProducts() as DogFoodProduct[]
  
  return (
    <div className="min-h-screen bg-gray-50">
      <ShoppingCart />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Premium Dog Food</h1>
          <p className="text-xl text-gray-600">
            Find the perfect nutrition for your dog with our selection of premium dog food products. Complete with detailed nutritional information.
          </p>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-lg">No dog food products found.</p>
            <p className="text-gray-500 mt-2">Check back soon for new products!</p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{products.length}</span> products
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} type="food" />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}