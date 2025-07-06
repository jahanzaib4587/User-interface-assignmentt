import { motion } from 'framer-motion';
import { Loading } from './Loading';

interface InfiniteScrollLoaderProps {
  isLoading: boolean;
  hasNextPage: boolean;
  className?: string;
}

export const InfiniteScrollLoader = ({ 
  isLoading, 
  hasNextPage, 
  className = '' 
}: InfiniteScrollLoaderProps) => {
  if (!hasNextPage && !isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`text-center py-8 ${className}`}
      >
        <div className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 rounded-full">
          <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-600 font-medium">All users loaded</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`text-center py-8 ${className}`}
    >
      {isLoading ? (
        <div className="flex flex-col items-center">
          <Loading variant="spinner" size="lg" className="text-blue-600 mb-3" />
          <p className="text-gray-600 font-medium">Loading more users...</p>
          <p className="text-gray-500 text-sm mt-1">Please wait while we fetch more profiles</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="animate-pulse">
            <Loading variant="dots" size="md" className="text-blue-600 mb-3" />
          </div>
          <p className="text-gray-500 text-sm">Scroll down to load more users</p>
        </div>
      )}
    </motion.div>
  );
}; 