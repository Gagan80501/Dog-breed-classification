import { getDogBreed } from '@/lib/cosmic'
import { DogBreed } from '@/types'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function BreedPage({ params }: PageProps) {
  const { slug } = await params
  const breed = await getDogBreed(slug) as DogBreed | null
  
  if (!breed) {
    notFound()
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {breed.metadata.breed_image && (
            <div className="relative h-96">
              <img 
                src={`${breed.metadata.breed_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                alt={breed.metadata.breed_name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">{breed.metadata.breed_name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {breed.metadata.size_category && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Size</h3>
                  <p className="text-lg">{breed.metadata.size_category.value}</p>
                </div>
              )}
              
              {breed.metadata.exercise_needs && (
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Exercise Needs</h3>
                  <p className="text-lg">{breed.metadata.exercise_needs.value}</p>
                </div>
              )}
              
              {breed.metadata.life_span && (
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Life Span</h3>
                  <p className="text-lg">{breed.metadata.life_span}</p>
                </div>
              )}
            </div>
            
            {breed.metadata.temperament && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Temperament</h2>
                <p className="text-lg text-gray-700">{breed.metadata.temperament}</p>
              </div>
            )}
            
            {breed.metadata.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About This Breed</h2>
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: breed.metadata.description }}
                />
              </div>
            )}
            
            {breed.metadata.care_tips && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Care Tips</h2>
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: breed.metadata.care_tips }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}