import { useCallback } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { UserCard, UserCardSkeleton } from './components/UserCard';
import { UserModal } from './components/UserModal';
import { Navbar } from './components/ui/Navbar';
import { useInfiniteUsers, useUser } from './hooks/useUsers';
import { useModal } from './hooks/useModal';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { Button } from './components/ui/Button';
import { InfiniteScrollLoader } from './components/ui/InfiniteScrollLoader';
import { ERROR_MESSAGES } from './utils/constants';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function AppContent() {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
    refetch
  } = useInfiniteUsers(20);
  
  const { isOpen, selectedUserId, openModal, closeModal } = useModal();
  const { data: selectedUserData } = useUser(selectedUserId || 0);

  const handleViewMore = (userId: number) => {
    openModal(userId);
  };

  const handleRetry = () => {
    refetch();
  };

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { loadMoreRef } = useInfiniteScroll(
    handleLoadMore,
    !!hasNextPage,
    isFetchingNextPage
  );

  const allUsers = data?.pages.flatMap(page => page.users || []) ?? [];
  
  // Calculate total users with fallback logic
  const totalUsers = data?.pages[0]?.pagination?.total ?? 
                     data?.pages[0]?.total_users ?? 
                     0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userCount={allUsers.length} totalUsers={totalUsers} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-12"
          >
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-lg font-semibold text-red-800 mb-2">Oops! Something went wrong</h2>
              <p className="text-red-600 mb-4">{ERROR_MESSAGES.NETWORK_ERROR}</p>
              <Button onClick={handleRetry} variant="primary">
                Try Again
              </Button>
            </div>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {isLoading && allUsers.length === 0
                ? Array.from({ length: 20 }, (_, index) => (
                    <UserCardSkeleton key={index} />
                  ))
                : allUsers.map((user, index) => (
                    <motion.div
                      key={user?.id || `user-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 1) }}
                    >
                      <UserCard user={user} onViewMore={handleViewMore} />
                    </motion.div>
                  ))}
            </motion.div>

            {/* Infinite Scroll Loader */}
            <div ref={loadMoreRef}>
              <InfiniteScrollLoader 
                isLoading={isFetchingNextPage} 
                hasNextPage={!!hasNextPage}
              />
            </div>

            {/* Manual Load More Button (fallback) */}
            {hasNextPage && !isFetchingNextPage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mt-8"
              >
                <Button
                  onClick={handleLoadMore}
                  variant="outline"
                  size="lg"
                  className="px-8 py-3"
                >
                  Load More Users
                </Button>
              </motion.div>
            )}
          </>
        )}

        <UserModal
          isOpen={isOpen}
          onClose={closeModal}
          user={selectedUserData?.user || null}
          isLoading={selectedUserId !== null && !selectedUserData}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

