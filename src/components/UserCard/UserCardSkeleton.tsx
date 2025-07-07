import { motion } from 'framer-motion';

export const UserCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 max-w-sm mx-auto h-[400px] flex flex-col animate-pulse"
      >
      {/* Profile image skeleton */}
      <div className="flex flex-col items-center mb-4">
        <div className="relative mb-3">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full ring-4 ring-gray-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          {/* Status indicator skeleton */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-200 rounded-full border-4 border-white" />
        </div>
        
        {/* Name skeleton */}
        <div className="text-center mb-2">
          <div className="h-5 bg-gray-200 rounded-lg w-32 mb-2" />
          <div className="h-6 bg-gray-200 rounded-full w-24" />
        </div>
      </div>

      {/* Description skeleton */}
      <div className="mb-4 flex-1 flex flex-col justify-start">
        <div className="min-h-[48px] max-h-[72px] space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
          <div className="h-3 bg-gray-200 rounded w-4/6" />
        </div>
      </div>

      {/* Join date skeleton */}
      <div className="mb-4 mt-auto">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-200 rounded-full" />
            <div className="h-3 bg-gray-200 rounded w-12" />
          </div>
          <div className="h-4 bg-gray-200 rounded w-20" />
        </div>
      </div>

      {/* Button skeleton */}
      <div className="h-10 bg-gray-200 rounded-lg w-full" />
      </div>
    </motion.div>
  );
}; 