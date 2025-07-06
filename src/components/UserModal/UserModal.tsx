import { motion } from 'framer-motion';
import { User } from '../../types/user';
import { Modal } from '../ui/Modal';
import { Loading } from '../ui/Loading';
import { useImageLoader } from '../../hooks/useImageLoader';
import { generateAvatarFallback } from '../../utils/imageHelpers';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  isLoading?: boolean;
}

export const UserModal = ({ isOpen, onClose, user, isLoading = false }: UserModalProps) => {
  const { isLoading: imageLoading, hasError, imageSrc, imageClasses, aspectRatio, dimensions } = useImageLoader(user?.profile_picture || '');

  if (!user && !isLoading) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  // Determine optimal image container size based on aspect ratio
  const getImageContainerClasses = () => {
    if (aspectRatio === null) return 'w-48 h-48'; // Default square
    
    if (aspectRatio > 1.5) {
      // Wide image - use landscape orientation
      return 'w-72 h-48';
    } else if (aspectRatio < 0.7) {
      // Tall image - use portrait orientation
      return 'w-36 h-48';
    } else {
      // Square-ish image
      return 'w-48 h-48';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loading variant="spinner" size="lg" />
        </div>
      ) : user ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-0 right-0 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6 text-gray-600 hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header Section */}
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            {/* Profile Picture */}
            <div className="flex-shrink-0 mx-auto lg:mx-0">
              <div className="relative">
                <div className={`${getImageContainerClasses()} rounded-2xl overflow-hidden shadow-lg`}>
                  {imageLoading ? (
                    <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                      <Loading variant="spinner" size="md" />
                    </div>
                  ) : hasError || !imageSrc ? (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <img
                        src={generateAvatarFallback(user.first_name || 'Unknown', user.last_name || 'User')}
                        alt={`${user.first_name || 'Unknown'} ${user.last_name || 'User'}`}
                        className="w-32 h-32 rounded-full"
                      />
                    </div>
                  ) : (
                    <img
                      src={imageSrc}
                      alt={`${user.first_name || 'Unknown'} ${user.last_name || 'User'}`}
                      className={`w-full h-full ${imageClasses}`}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  {user.first_name || 'Unknown'} {user.last_name || 'User'}
                </h2>
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mb-4">
                  <span className="text-xl text-blue-600 font-medium">{user.job || 'No job specified'}</span>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    user.gender === 'Male' || user.gender === 'male' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-pink-100 text-pink-800'
                  }`}>
                    {user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Unknown'}
                  </span>
                </div>
                <div className="inline-flex items-center px-3 py-2 bg-gray-50 rounded-lg">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600 font-medium">ZIP: {user.zipcode || 'Unknown'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  {user.email ? (
                    <a 
                      href={`mailto:${user.email}`}
                      className="text-blue-600 hover:text-blue-800 font-medium break-all underline-offset-2 hover:underline transition-colors duration-200"
                    >
                      {user.email}
                    </a>
                  ) : (
                    <p className="text-gray-900 font-medium">No email available</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  {user.phone ? (
                    <a 
                      href={`tel:${user.phone}`}
                      className="text-blue-600 hover:text-blue-800 font-medium underline-offset-2 hover:underline transition-colors duration-200"
                    >
                      {formatPhoneNumber(user.phone)}
                    </a>
                  ) : (
                    <p className="text-gray-900 font-medium">No phone available</p>
                  )}
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Location Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Address</p>
                  <p className="text-gray-900 font-medium">{user.street || 'No street address'}</p>
                  <p className="text-gray-700">{user.city || 'Unknown'}, {user.state || 'Unknown'} {user.zipcode || 'Unknown'}</p>
                  <p className="text-gray-700">{user.country || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Coordinates</p>
                  <p className="text-gray-900 font-medium font-mono text-sm">
                    {typeof user.latitude === 'number' && typeof user.longitude === 'number' 
                      ? `${user.latitude.toFixed(6)}, ${user.longitude.toFixed(6)}`
                      : 'Coordinates not available'}
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-gray-50 rounded-xl p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Personal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                  <p className="text-gray-900 font-medium">{user.date_of_birth ? formatDate(user.date_of_birth) : 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">User ID</p>
                  <p className="text-gray-900 font-medium">#{user.id ? user.id.toString().padStart(4, '0') : '0000'}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">User not found</p>
        </div>
      )}
    </Modal>
  );
}; 