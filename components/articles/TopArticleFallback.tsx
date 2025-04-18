// components/loaders/TopArticlesFallback.tsx
import React from 'react'

type TopArticlesFallbackProps = {
  count?: number
}

const TopArticlesFallback: React.FC<TopArticlesFallbackProps> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl bg-[#0f172a] p-4 shadow-md animate-pulse dark:border dark:border-gray-800"
        >
          {/* Image Placeholder */}
          <div className="mb-4 h-48 w-full rounded-lg bg-gray-700" />

          {/* Author Row */}
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 rounded-full bg-gray-600" />
            <div className="h-4 w-24 bg-gray-600 rounded" />
          </div>

          {/* Title Placeholder */}
          <div className="h-6 w-3/4 bg-gray-500 rounded mb-2" />

          {/* Category Placeholder */}
          <div className="h-4 w-1/3 bg-gray-600 rounded mb-4" />

          {/* Footer Row */}
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="h-4 w-24 bg-gray-600 rounded" />
            <div className="h-4 w-16 bg-gray-600 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default TopArticlesFallback
