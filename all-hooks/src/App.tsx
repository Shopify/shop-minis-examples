import { useState } from 'react'
import { HookDemo } from './components/HookDemo'
import { Hook, categories } from './utils/hooksMeta'
import { hooks } from './utils/hooksData'

export function App() {
  const [selectedHook, setSelectedHook] = useState<Hook | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  if (selectedHook) {
    return <HookDemo hook={selectedHook} onBack={() => setSelectedHook(null)} />
  }

  const filteredHooks = selectedCategory
    ? hooks.filter(hook => hook.category === selectedCategory)
    : hooks

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Minimalist Header */}
      <div className="border-b border-gray-100 sticky top-0 z-10 bg-white">
        <div className="px-6 py-5">
          <h1 className="text-2xl font-semibold text-black m-0 tracking-tight">
            Shop Minis SDK Hooks
          </h1>
          <p className="text-gray-500 mt-1 text-sm font-normal m-0">
            {hooks.length} hooks · {categories.length} categories
          </p>
        </div>
      </div>

      <div className="p-6">
        {/* Simplified Category Navigation */}
        <div className="mb-8">
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`shrink-0 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium cursor-pointer outline-none tracking-tight transition-all duration-200 ${
                !selectedCategory
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              All
            </button>

            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium cursor-pointer outline-none tracking-tight transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Minimalist Hook List */}
        <div className="flex flex-col gap-px">
          {filteredHooks.map((hook, index) => (
            <div
              key={hook.name}
              onClick={() => setSelectedHook(hook)}
              className={`bg-white py-5 cursor-pointer transition-colors duration-150 hover:bg-gray-50 ${
                index < filteredHooks.length - 1
                  ? 'border-b border-gray-100'
                  : ''
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Minimalist Icon */}
                <div className="w-9 h-9 rounded-[10px] bg-gray-100 flex items-center justify-center shrink-0 text-sm font-semibold text-gray-500">
                  {hook.emoji}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-black mb-1 tracking-tight">
                    {hook.name}
                  </h3>
                  <p className="text-sm text-gray-500 m-0 leading-[1.5]">
                    {hook.description}
                  </p>
                </div>

                {/* Subtle category indicator */}
                <div className="text-xs text-gray-400 font-normal self-center">
                  {hook.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minimalist Category Summary */}
        {selectedCategory && filteredHooks.length === 0 && (
          <div className="text-center mt-20 p-10">
            <p className="text-base text-gray-500 m-0">
              No hooks in {selectedCategory} category
            </p>
          </div>
        )}

        {/* Minimalist Footer */}
        <div className="mt-20 text-center py-5 text-xs text-gray-400">
          <p className="m-0">shop-minis-react</p>
        </div>
      </div>
    </div>
  )
}
