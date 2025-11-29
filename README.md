# DogBreed AI - AI-Powered Dog Breed Classification Platform

![App Preview](https://imgix.cosmicjs.com/ce93cdb0-cce7-11f0-9a3e-e74080092601-photo-1548199973-03cce0bbc87b-1764395637498.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive dog breed classification and information platform powered by AI and built with Next.js 16, TypeScript, and Cosmic CMS.

## Features

- 🔍 **AI Breed Classification**: Upload dog photos for instant breed identification
- 📊 **Comprehensive Dashboard**: Manage dogs, view scan history, and get personalized recommendations
- 🛒 **Marketplace**: Browse and shop for breed-specific products and accessories
- 🍖 **Dog Food Store**: Find nutritional information and purchase premium dog food
- 💬 **Community Platform**: Share stories, ask questions, and connect with other dog owners
- 📞 **Contact System**: Submit inquiries with categorized inquiry types
- 👤 **User Authentication**: Secure login/logout with user profiles and favorites
- 📱 **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=692a89ccc5646c2bd110d1ac&clone_repository=692a8bd0c5646c2bd110d1dd)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "create a UI for dog breed classification and info generation add the upload button to predict the breed and add the dashboard in dashboard add the market place and fodd contact and community and also add the login and logout to it"

### Code Generation Prompt

> Based on the content model I created for "create a UI for dog breed classification and info generation add the upload button to predict the breed and add the dashboard in dashboard add the market place and fodd contact and community and also add the login and logout to it", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **Icons**: Lucide React
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd dogbreed-ai
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Dog Breeds

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: breeds } = await cosmic.objects
  .find({ type: 'dog-breeds' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Marketplace Items

```typescript
const { objects: items } = await cosmic.objects
  .find({ type: 'marketplace-items' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Creating a Contact Submission

```typescript
await cosmic.objects.insertOne({
  type: 'contact-submissions',
  title: formData.name,
  metadata: {
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
    inquiry_type: { key: 'general', value: 'General Inquiry' },
    status: { key: 'new', value: 'New' }
  }
})
```

## Cosmic CMS Integration

This application uses Cosmic as a headless CMS to manage all content. The content model includes:

- **Dog Breeds**: Comprehensive breed information with images, descriptions, and care tips
- **Marketplace Items**: Products with categories, pricing, and breed compatibility
- **Dog Food Products**: Nutritional information and product details
- **Community Posts**: User-generated content with author profiles
- **User Profiles**: Member data with favorite breeds and owned dogs
- **App Pages**: Dynamic page content for home and dashboard
- **App Settings**: Application configuration and feature toggles
- **Contact Submissions**: User inquiries and support requests

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Deploy to Netlify

1. Push your code to GitHub
2. Import your repository in Netlify
3. Add environment variables in Netlify dashboard
4. Deploy!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

<!-- README_END -->