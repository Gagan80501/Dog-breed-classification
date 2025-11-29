import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Get all dog breeds
export async function getDogBreeds() {
  try {
    const response = await cosmic.objects
      .find({ type: 'dog-breeds' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch dog breeds')
  }
}

// Get single dog breed by slug
export async function getDogBreed(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'dog-breeds', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch dog breed')
  }
}

// Get marketplace items
export async function getMarketplaceItems() {
  try {
    const response = await cosmic.objects
      .find({ type: 'marketplace-items' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch marketplace items')
  }
}

// Get dog food products
export async function getDogFoodProducts() {
  try {
    const response = await cosmic.objects
      .find({ type: 'dog-food-products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch dog food products')
  }
}

// Get community posts
export async function getCommunityPosts() {
  try {
    const response = await cosmic.objects
      .find({ type: 'community-posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch community posts')
  }
}

// Get app settings
export async function getAppSettings() {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'app-settings' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch app settings')
  }
}

// Get app page by slug
export async function getAppPage(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'app-pages', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch app page')
  }
}

// Get user profile
export async function getUserProfile(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'user-profiles', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch user profile')
  }
}