import { useState } from 'react'
import { Button, Input, useErrorToast } from '@shopify/shop-minis-react'

export function ErrorToast() {
  const { showErrorToast } = useErrorToast()
  const [message, setMessage] = useState('Something went wrong!')

  const showError = () => {
    showErrorToast({ message })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Error Toast</h3>
      <p className="text-sm text-gray-600">Show error messages to the user</p>
      <div className="space-y-2">
        <Input
          placeholder="Error message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <Button onClick={showError}>Show Error Toast</Button>
      </div>
    </div>
  )
}
