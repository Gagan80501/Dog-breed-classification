import { CommunityPost } from '@/types'

interface CommunityPostCardProps {
  post: CommunityPost
}

export default function CommunityPostCard({ post }: CommunityPostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-start gap-4 mb-4">
        {post.metadata.author?.metadata.profile_photo && (
          <img 
            src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
            alt={post.metadata.author.metadata.full_name}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold">{post.metadata.post_title}</h3>
            {post.metadata.category && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {post.metadata.category.value}
              </span>
            )}
          </div>
          
          {post.metadata.author && (
            <p className="text-sm text-gray-600 mb-3">
              by {post.metadata.author.metadata.full_name}
            </p>
          )}
          
          {post.metadata.related_breed && (
            <div className="mb-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                Related: {post.metadata.related_breed.metadata.breed_name}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {post.metadata.content && (
        <div 
          className="prose max-w-none mb-4"
          dangerouslySetInnerHTML={{ __html: post.metadata.content }}
        />
      )}
      
      {post.metadata.post_images && post.metadata.post_images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {post.metadata.post_images.map((image, index) => (
            <img 
              key={index}
              src={`${image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
              alt={`Post image ${index + 1}`}
              className="rounded-lg w-full h-48 object-cover"
            />
          ))}
        </div>
      )}
    </div>
  )
}