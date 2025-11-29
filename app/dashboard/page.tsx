import { getAppPage, getDogBreeds, getMarketplaceItems, getDogFoodProducts } from '@/lib/cosmic'
import { AppPage, DogBreed, MarketplaceItem, DogFoodProduct } from '@/types'
import UploadButton from '@/components/UploadButton'
import BreedCard from '@/components/BreedCard'
import ProductCard from '@/components/ProductCard'

export default async function DashboardPage() {
  const page = await getAppPage('dashboard') as AppPage | null
  const breeds = await getDogBreeds() as DogBreed[]
  const marketplaceItems = await getMarketplaceItems() as MarketplaceItem[]
  const foodProducts = await getDogFoodProducts() as DogFoodProduct[]
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">
                {page?.metadata.hero_heading || 'Your Dog Dashboard'}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {page?.metadata.hero_subheading || 'Manage your dogs and explore recommendations'}
              </p>
              {page?.metadata.show_upload_button && <UploadButton />}
            </div>
            {page?.metadata.hero_image && (
              <div className="flex-1">
                <img 
                  src={`${page.metadata.hero_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                  alt="Dashboard"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-12">
        {page?.metadata.content && (
          <div 
            className="prose max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: page.metadata.content }}
          />
        )}
        
        {/* Popular Breeds */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Popular Dog Breeds</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {breeds.slice(0, 3).map((breed) => (
              <BreedCard key={breed.id} breed={breed} />
            ))}
          </div>
        </section>
        
        {/* Featured Marketplace Items */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Featured Marketplace Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketplaceItems.slice(0, 3).map((item) => (
              <ProductCard key={item.id} product={item} type="marketplace" />
            ))}
          </div>
        </section>
        
        {/* Recommended Food */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Recommended Dog Food</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} type="food" />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}