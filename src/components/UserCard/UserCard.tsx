import { motion } from 'framer-motion';
import { User } from '../../types/user';
import { Button } from '../ui/Button';
import { useImageLoader } from '../../hooks/useImageLoader';
import { generateAvatarFallback } from '../../utils/imageHelpers';

interface UserCardProps {
  user: User;
  onViewMore: (userId: number) => void;
}

export const UserCard = ({ user, onViewMore }: UserCardProps) => {
  // Always call hooks first, before any conditional logic
  const { isLoading, hasError, imageSrc, imageClasses, aspectRatio } = useImageLoader(user?.profile_picture || '');

  // Early return if user is null/undefined (after hooks)
  if (!user) {
    return null;
  }

  const handleViewMore = () => {
    onViewMore(user.id);
  };

  // Determine container height based on aspect ratio
  const getContainerClasses = () => {
    if (aspectRatio === null) return 'h-48'; // Default height
    if (aspectRatio > 1.5) return 'h-36'; // Wide images get shorter container
    if (aspectRatio < 0.7) return 'h-64'; // Tall images get taller container
    return 'h-48'; // Square-ish images get default height
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      <div className="relative">
        {isLoading ? (
          <div className="w-full h-48 bg-gray-200 animate-pulse flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        ) : hasError || !imageSrc ? (
          <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <img
              src={generateAvatarFallback(user.first_name, user.last_name)}
              alt={`${user.first_name} ${user.last_name}`}
              className="w-24 h-24 rounded-full"
            />
          </div>
        ) : (
          <div className={`w-full ${getContainerClasses()} overflow-hidden`}>
            <img
              src={imageSrc}
              alt={`${user.first_name} ${user.last_name}`}
              className={`w-full h-full ${imageClasses}`}
            />
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {user.first_name || 'Unknown'} {user.last_name || 'User'}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{user.job || 'No job specified'}</p>
          <p className="text-gray-500 text-sm">{user.email || 'No email available'}</p>
        </div>

        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {user.city || 'Unknown'}, {user.state || 'Unknown'}, {user.country || 'Unknown'}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" clipRule="evenodd" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            {user.email}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <span className={`px-2 py-1 text-xs rounded-full ${
              user.gender === 'Male' || user.gender === 'male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
            }`}>
              {user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Unknown'}
            </span>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleViewMore}
            className="flex items-center space-x-1"
          >
            <span>View More</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}; 