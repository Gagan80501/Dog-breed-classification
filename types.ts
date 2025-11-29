// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

// Dog Breed type
export interface DogBreed extends CosmicObject {
  type: 'dog-breeds'
  metadata: {
    breed_name: string
    breed_image?: {
      url: string
      imgix_url: string
    }
    size_category?: {
      key: 'small' | 'medium' | 'large' | 'giant'
      value: string
    }
    temperament?: string
    description?: string
    care_tips?: string
    exercise_needs?: {
      key: 'low' | 'moderate' | 'high'
      value: string
    }
    life_span?: string
  }
}

// Marketplace Item type
export interface MarketplaceItem extends CosmicObject {
  type: 'marketplace-items'
  metadata: {
    item_name: string
    category: {
      key: 'toys' | 'accessories' | 'grooming' | 'health' | 'training'
      value: string
    }
    price: number
    description?: string
    product_image?: {
      url: string
      imgix_url: string
    }
    in_stock: boolean
    suitable_for_breeds?: DogBreed[]
  }
}

// Dog Food Product type
export interface DogFoodProduct extends CosmicObject {
  type: 'dog-food-products'
  metadata: {
    product_name: string
    brand?: string
    food_type?: {
      key: 'dry' | 'wet' | 'raw' | 'treats'
      value: string
    }
    size_category?: string[]
    price: number
    weight?: string
    nutritional_info?: string
    product_image?: {
      url: string
      imgix_url: string
    }
  }
}

// User Profile type
export interface UserProfile extends CosmicObject {
  type: 'user-profiles'
  metadata: {
    full_name: string
    email: string
    profile_photo?: {
      url: string
      imgix_url: string
    }
    favorite_breeds?: DogBreed[]
    my_dogs?: Array<{
      name: string
      breed: string
      age: number
      weight: string
    }>
    member_since?: string
  }
}

// Community Post type
export interface CommunityPost extends CosmicObject {
  type: 'community-posts'
  metadata: {
    post_title: string
    author?: UserProfile
    content: string
    related_breed?: DogBreed
    post_images?: Array<{
      url: string
      imgix_url: string
    }>
    category?: {
      key: 'discussion' | 'question' | 'story' | 'tips'
      value: string
    }
  }
}

// Contact Submission type
export interface ContactSubmission extends CosmicObject {
  type: 'contact-submissions'
  metadata: {
    name: string
    email: string
    subject?: string
    message: string
    inquiry_type?: {
      key: 'general' | 'support' | 'feedback' | 'partnership'
      value: string
    }
    status?: {
      key: 'new' | 'in_progress' | 'resolved'
      value: string
    }
  }
}

// App Page type
export interface AppPage extends CosmicObject {
  type: 'app-pages'
  metadata: {
    page_title: string
    page_type: {
      key: 'home' | 'dashboard' | 'marketplace' | 'community' | 'contact'
      value: string
    }
    hero_heading?: string
    hero_subheading?: string
    hero_image?: {
      url: string
      imgix_url: string
    }
    content?: string
    show_upload_button?: boolean
  }
}

// App Settings type
export interface AppSettings extends CosmicObject {
  type: 'app-settings'
  metadata: {
    app_name: string
    app_logo?: {
      url: string
      imgix_url: string
    }
    enable_user_registration: boolean
    enable_marketplace: boolean
    enable_community: boolean
    ai_model_endpoint?: string
    contact_email?: string
    social_links?: {
      facebook?: string
      twitter?: string
      instagram?: string
    }
  }
}

// API response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
}

// Cart Item type
export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  type: 'marketplace' | 'food'
}