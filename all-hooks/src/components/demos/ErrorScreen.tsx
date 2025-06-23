import { useState } from 'react'
import { Button, Input, useErrorScreen } from '@shopify/shop-minis-react'

// Fallback Textarea component since it's not exported from @shopify/shop-minis-react
const Textarea = ({ className = '', ...props }: any) => (
  <textarea
    className={`border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    {...props}
  />
)

export function ErrorScreen() {
  const { showErrorScreen } = useErrorScreen()
  const [title, setTitle] = useState('Oops! Something went wrong')
  const [message, setMessage] = useState(
    'We encountered an unexpected error. Please try again later.'
  )

  const showError = () => {
    showErrorScreen({ title, message })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Error Screen</h3>
      <p className="text-sm text-gray-600">Show a full-screen error overlay</p>
      <div className="space-y-2">
        <Input
          placeholder="Error title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Error message"
          value={message}
          onChange={(e: any) => setMessage(e.target.value)}
          rows={3}
        />
        <Button onClick={showError}>Show Error Screen</Button>
      </div>
    </div>
  )
}
