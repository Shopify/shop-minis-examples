/* eslint-disable no-undef */
import { useState } from 'react'
import { Button, useFollowedShopsActions } from '@shopify/shop-minis-react'
import { useFirstPopularProduct } from '../../utils/productUtils'

export function FollowedShopsActions() {
  const { followShop, unfollowShop } = useFollowedShopsActions()
  const [followedShops, setFollowedShops] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const { shop: firstShop } = useFirstPopularProduct()
  const shopToUse = firstShop
  const shopId = shopToUse?.id

  const handleFollow = async () => {
    setLoading(true)
    try {
      await followShop({ shopId })
      setFollowedShops(prev => [...prev, shopId])
    } catch (error) {
      console.error('Error following shop:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUnfollow = async () => {
    setLoading(true)
    try {
      await unfollowShop({ shopId })
      setFollowedShops(prev => prev.filter(id => id !== shopId))
    } catch (error) {
      console.error('Error unfollowing shop:', error)
    } finally {
      setLoading(false)
    }
  }

  const isFollowing = followedShops.includes(shopId)

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Follow/Unfollow Shops</h3>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h4 className="font-semibold">{shopToUse?.name}</h4>
        <p className="text-sm text-gray-600">
          {shopToUse?.description || 'Amazing products and great service!'}
        </p>
        <p className="text-xs text-gray-500 mt-1">Shop ID: {shopId}</p>
      </div>
      <div className="flex gap-2 items-center">
        <Button
          onClick={isFollowing ? handleUnfollow : handleFollow}
          disabled={loading}
        >
          {loading
            ? 'Processing...'
            : isFollowing
              ? 'Unfollow Shop'
              : 'Follow Shop'}
        </Button>
        <span className="text-sm text-gray-600">
          Status: {isFollowing ? 'Following ✓' : 'Not Following'}
        </span>
      </div>
    </div>
  )
}
