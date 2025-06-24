import { usePopularProducts } from '@shopify/shop-minis-react'
import { useState } from 'react'
import { fal } from '@fal-ai/client'

export function App() {
  const {products} = usePopularProducts()
  const [isGenerating, setIsGenerating] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Configure fal.ai with your API key
  // Get your API key from https://fal.ai
  fal.config({
    credentials: "YOUR_FAL_KEY_HERE" // Replace with your actual API key
  });

  const generateAvatar = async () => {
    if (!products || products.length === 0) {
      setError('No products available')
      return
    }

    setIsGenerating(true)
    setError(null)
    setAvatarUrl(null)

    try {
      // Get up to 10 product titles
      const productTitles = products.slice(0, 10).map(p => p.title).join(', ')
      
      // Create a simple prompt based on product titles
      const prompt = `A creative portrait avatar inspired by these interests: ${productTitles}. Modern digital art style, vibrant colors, professional lighting, suitable for profile picture.`

      // Generate avatar image using fal.ai flux/dev model
      const result = await fal.subscribe("fal-ai/flux/dev", {
        input: {
          prompt: prompt,
          image_size: "square",
          num_images: 1,
          enable_safety_checker: true
        }
      })

      if (result.data.images && result.data.images.length > 0) {
        setAvatarUrl(result.data.images[0].url)
      } else {
        setError('No image was generated')
      }
    } catch (err) {
      console.error('Error generating avatar:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate avatar')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="pt-12 px-4 pb-6">
      <h1 className="text-2xl font-bold mb-2 text-center">
        fal.ai Avatar Generator
      </h1>
      <p className="text-base text-gray-600 mb-6 text-center">
        Generate an AI avatar based on product recommendations
      </p>

      {/* Avatar Generation Section */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-center">Your AI Avatar</h2>
        
        {avatarUrl && (
          <div className="mb-4">
            <img 
              src={avatarUrl} 
              alt="Generated Avatar" 
              className="w-64 h-64 mx-auto rounded-lg shadow-lg"
            />
          </div>
        )}

        {error && (
          <div className="text-red-600 text-sm mb-4 text-center p-3 bg-red-50 rounded">
            {error}
          </div>
        )}

        <button
          onClick={generateAvatar}
          disabled={isGenerating || !products || products.length === 0}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
            isGenerating || !products || products.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isGenerating ? 'Generating Avatar...' : 'Generate My Avatar'}
        </button>
      </div>
    </div>
  )
}
