import Link from 'next/link'
import { DogBreed } from '@/types'

interface BreedCardProps {
  breed: DogBreed
}

export default function BreedCard({ breed }: BreedCardProps) {
  return (
    <Link href={`/breeds/${breed.slug}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
        {breed.metadata.breed_image && (
          <div className="relative h-48">
            <img 
              src={`${breed.metadata.breed_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
              alt={breed.metadata.breed_name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{breed.metadata.breed_name}</h3>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {breed.metadata.size_category && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {breed.metadata.size_category.value}
              </span>
            )}
            {breed.metadata.exercise_needs && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                {breed.metadata.exercise_needs.value} Exercise
              </span>
            )}
          </div>
          
          {breed.metadata.temperament && (
            <p className="text-gray-600 text-sm line-clamp-2">
              {breed.metadata.temperament}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}