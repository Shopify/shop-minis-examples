import React, { useState } from 'react'
import { Button, useImageUpload } from '@shopify/shop-minis-react'

interface ImageUploadProps {
  imageFile: File | null
  setImageFile: (file: File | null) => void
}

export function ImageUpload({ imageFile, setImageFile }: ImageUploadProps) {
  const upload = useImageUpload()
  const [uploadResult, setUploadResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
    }
  }

  const handleUpload = async () => {
    if (imageFile && (upload as any).upload) {
      setLoading(true)
      try {
        const result = await (upload as any).upload(imageFile)
        setUploadResult(result)
      } catch (error) {
        console.error('Error uploading image:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Image Upload</h3>
      <div className="space-y-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {imageFile && (
          <div className="text-sm text-gray-600">
            Selected: {imageFile.name} ({Math.round(imageFile.size / 1024)} KB)
          </div>
        )}
        <Button
          onClick={handleUpload}
          disabled={loading || !imageFile || !(upload as any).upload}
        >
          {loading ? 'Uploading...' : 'Upload Image'}
        </Button>
      </div>
      {uploadResult && (
        <div className="bg-green-100 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800">Upload Successful!</h4>
          <pre className="text-sm mt-2">
            {JSON.stringify(uploadResult, null, 2)}
          </pre>
        </div>
      )}
      <details className="bg-gray-50 border border-gray-200 rounded-lg">
        <summary className="cursor-pointer p-4 font-semibold text-gray-700 hover:bg-gray-100">
          🔧 Hook API Response
        </summary>
        <div className="p-4 pt-0">
          <pre className="text-sm text-gray-600 overflow-auto">
            {JSON.stringify(upload, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  )
}
