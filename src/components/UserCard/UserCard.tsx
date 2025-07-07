import { motion } from 'framer-motion';
import { User } from '../../types/user';
import { Button } from '../ui/Button';
import { useImageLoader } from '../../hooks/useImageLoader';
import { generateAvatarFallback } from '../../utils/imageHelpers';
import { truncateText, truncateEmail } from '../../utils/textHelpers';

interface UserCardProps {
  user: User;
  onViewMore: (userId: string) => void;
}

export const UserCard = ({ user, onViewMore }: UserCardProps) => {
  const { isLoading, hasError, imageSrc } = useImageLoader(user?.avatar || '');

  if (!user) {
    return null;
  }

  const handleViewMore = () => {
    onViewMore(user.id);
  };

  const fullName = `${user.firstname || 'Unknown'} ${user.lastname || 'User'}`;
  const truncatedName = truncateText(fullName, 20);
  const truncatedDescription = truncateText(user.description || 'No description available', 80);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-300 ease-out hover:-translate-y-1 overflow-hidden max-w-sm mx-auto h-[400px] flex flex-col"
    >
      {/* Compact header with centered profile image */}
      <div className="flex flex-col items-center mb-4">
        <div className="relative mb-3">
          <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300">
            {!hasError && imageSrc ? (
              <img
                src={imageSrc}
                alt={`${fullName} profile`}
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                onError={() => {
                  // Handle image error by replacing with fallback
                }}
              />
            ) : (
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: generateAvatarFallback(user.firstname || 'Unknown', user.lastname || 'User') }}
              />
            )}
          </div>
          {/* Professional status indicator */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>
        
        {/* Name and role centered */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
            {truncatedName}
          </h3>
          <div className="inline-flex items-center px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
            <span className="text-sm font-semibold text-blue-700">
              {user.role || 'Member'}
            </span>
          </div>
        </div>
      </div>

      {/* Standardized description section with proper text display */}
      <div className="mb-4 flex-1 flex flex-col justify-start">
        <div className="min-h-[48px] max-h-[72px] overflow-hidden">
          <p className="text-sm text-gray-600 leading-relaxed text-center line-clamp-3">
            {truncatedDescription}
          </p>
        </div>
      </div>

      {/* Fixed position joined date section */}
      <div className="mb-4 mt-auto">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors duration-200">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M8 7V3a4 4 0 118 0v4m-4 8l-3-3m0 0l3-3m-3 3h12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
            <span className="text-xs font-medium text-gray-500">Joined</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">{user.join_date || 'Unknown'}</span>
        </div>
      </div>

      {/* Fixed position action button */}
      <div>
        <Button
          onClick={handleViewMore}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 border-0"
        >
          <span className="flex items-center justify-center space-x-2">
            <span className="text-sm">View More</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </span>
        </Button>
      </div>
    </motion.div>
  );
}; 