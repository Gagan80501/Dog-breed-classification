'use client'

import { Upload, X, Loader2 } from 'lucide-react'
import { useState, useRef } from 'react'

interface BreedResult {
  breed: string
  confidence: number
  description?: string
}

export default function UploadButton() {
  const [isUploading, setIsUploading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [breedResult, setBreedResult] = useState<BreedResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    // Clear previous results and errors
    setError(null)
    setBreedResult(null)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Upload and classify
    setIsUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/classify', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Classification failed')
      }

      const data = await response.json()
      setBreedResult(data)
    } catch (err) {
      setError('Failed to classify breed. Please try again.')
      console.error('Classification error:', err)
    } finally {
      setIsUploading(false)
    }
  }

  const handleClear = () => {
    setSelectedImage(null)
    setBreedResult(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="w-full max-w-2xl">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={isUploading}
      />
      
      {!selectedImage ? (
        <button
          onClick={handleButtonClick}
          disabled={isUploading}
          className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          <Upload size={20} />
          {isUploading ? 'Analyzing...' : 'Upload Photo to Identify Breed'}
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              {isUploading ? 'Analyzing Image...' : breedResult ? 'Classification Results' : 'Image Uploaded'}
            </h3>
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isUploading}
            >
              <X size={24} />
            </button>
          </div>

          <div className="mb-4">
            <img
              src={selectedImage}
              alt="Uploaded dog"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {isUploading && (
            <div className="flex items-center justify-center gap-3 text-blue-600 py-4">
              <Loader2 size={24} className="animate-spin" />
              <span className="font-medium">Analyzing breed characteristics...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              <p className="font-medium">{error}</p>
            </div>
          )}

          {breedResult && !isUploading && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-900 text-lg mb-2">
                  Identified Breed: {breedResult.breed}
                </h4>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-blue-700">Confidence:</span>
                  <div className="flex-1 bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${breedResult.confidence}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-blue-700">
                    {breedResult.confidence}%
                  </span>
                </div>
                {breedResult.description && (
                  <p className="text-sm text-blue-800">{breedResult.description}</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleButtonClick}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Try Another Image
                </button>
                <a
                  href={`/breeds/${breedResult.breed.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex-1 bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
                >
                  Learn More About {breedResult.breed}
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}