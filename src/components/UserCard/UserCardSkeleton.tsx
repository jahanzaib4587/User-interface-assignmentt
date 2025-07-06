import { motion } from 'framer-motion';

export const UserCardSkeleton = () => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      data-testid="user-card-skeleton"
    >
      <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
      
      <div className="p-6">
        <div className="mb-4">
          <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
        </div>

        <div className="mb-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
        </div>

        <div className="mb-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
        </div>

        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
          <div className="h-8 bg-gray-200 rounded animate-pulse w-24"></div>
        </div>
      </div>
    </motion.div>
  );
}; 