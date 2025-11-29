import { getAppPage } from '@/lib/cosmic'
import UploadButton from '@/components/UploadButton'
import { AppPage } from '@/types'

export default async function Home() {
  const page = await getAppPage('home-page') as AppPage | null
  
  if (!page) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">Welcome to DogBreed AI</h1>
        <p className="mt-4 text-gray-600">Upload a photo to identify your dog's breed!</p>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        {page.metadata.hero_image && (
          <img 
            src={`${page.metadata.hero_image.imgix_url}?w=1920&h=600&fit=crop&auto=format,compress`}
            alt={page.metadata.hero_heading || 'Hero'}
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />
        )}
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              {page.metadata.hero_heading || 'Discover Your Dog\'s Breed'}
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100">
              {page.metadata.hero_subheading || 'Upload a photo and get instant breed identification'}
            </p>
            {page.metadata.show_upload_button && <UploadButton />}
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      {page.metadata.content && (
        <section className="container mx-auto px-4 py-16">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: page.metadata.content }}
          />
        </section>
      )}
    </div>
  )
}