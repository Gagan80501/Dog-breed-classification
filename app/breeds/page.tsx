import { getDogBreeds } from '@/lib/cosmic'
import { DogBreed } from '@/types'
import BreedCard from '@/components/BreedCard'

export default async function BreedsPage() {
  const breeds = await getDogBreeds() as DogBreed[]
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Dog Breeds</h1>
        <p className="text-xl text-gray-600 mb-12">
          Explore our comprehensive database of dog breeds with detailed information about each breed.
        </p>
        
        {breeds.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No dog breeds found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {breeds.map((breed) => (
              <BreedCard key={breed.id} breed={breed} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}