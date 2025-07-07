import { useInfiniteQuery } from '@tanstack/react-query';
import { userService } from '../services/userService';

export const useInfiniteUsers = (limit: number = 20) => {
  return useInfiniteQuery({
    queryKey: ['users', 'infinite', limit],
    queryFn: ({ pageParam = 1 }) => userService.fetchUsers(Math.max(1, pageParam), Math.max(1, limit)),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      console.log('getNextPageParam called with:', { lastPage, allPages });
      
      // Check if lastPage exists and has the correct structure
      if (!lastPage || !lastPage.data || !lastPage.data.users) {
        console.warn('Invalid API response: no lastPage data');
        return undefined;
      }
      
      // Since the new API doesn't have pagination info, we'll use the users array length
      // to determine if there are more pages
      const usersCount = lastPage.data.users.length;
      const expectedLimit = limit || 20;
      
      // If we got fewer users than requested, we're at the end
      if (usersCount < expectedLimit) {
        return undefined;
      }
      
      // Otherwise, there might be more pages
      return allPages.length + 1;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}; 