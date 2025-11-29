import { getCommunityPosts } from '@/lib/cosmic'
import { CommunityPost } from '@/types'
import CommunityPostCard from '@/components/CommunityPostCard'

export default async function CommunityPage() {
  const posts = await getCommunityPosts() as CommunityPost[]
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Community</h1>
        <p className="text-xl text-gray-600 mb-12">
          Connect with fellow dog lovers, share stories, and get advice.
        </p>
        
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No community posts yet. Be the first to share!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <CommunityPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}