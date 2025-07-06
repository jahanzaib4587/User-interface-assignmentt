import { motion } from 'framer-motion';

interface NavbarProps {
  userCount?: number;
  totalUsers?: number;
}

export const Navbar = ({ userCount = 0, totalUsers = 1000 }: NavbarProps) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Directory</h1>
              <p className="text-sm text-gray-600">Discover and explore user profiles</p>
            </div>
          </div>

          {/* User Counter */}
          <div className="hidden sm:flex items-center space-x-4">
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {userCount} of {totalUsers} users loaded
                </span>
              </div>
            </div>
          </div>

          {/* Mobile user counter */}
          <div className="sm:hidden">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {userCount}/{totalUsers}
            </span>
          </div>
        </div>

        {/* Mobile subtitle */}
        <div className="sm:hidden pb-2">
          <p className="text-xs text-gray-500">Discover and explore user profiles</p>
        </div>
      </div>
    </motion.nav>
  );
}; 