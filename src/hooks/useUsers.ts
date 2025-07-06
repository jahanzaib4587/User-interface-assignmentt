import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { userService } from '../services/userService';

export const useUsers = (page: number = 1, limit: number = 20) => {
  return useQuery({
    queryKey: ['users', page, limit],
    queryFn: () => userService.fetchUsers(Math.max(1, page), Math.max(1, limit)),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useInfiniteUsers = (limit: number = 20) => {
  return useInfiniteQuery({
    queryKey: ['users', 'infinite', limit],
    queryFn: ({ pageParam = 1 }) => userService.fetchUsers(Math.max(1, pageParam), Math.max(1, limit)),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      console.log('getNextPageParam called with:', { lastPage, allPages });
      
      // Check if lastPage exists
      if (!lastPage) {
        console.warn('Invalid API response: no lastPage data');
        return undefined;
      }
      
      // Method 1: Check pagination object (preferred)
      if (lastPage.pagination) {
        const { current_page, total_pages } = lastPage.pagination;
        
        if (typeof current_page === 'number' && typeof total_pages === 'number') {
          return current_page < total_pages ? current_page + 1 : undefined;
        }
      }
      
      // Method 2: Check alternative pagination structure
      if (typeof lastPage.total_users === 'number' && typeof lastPage.offset === 'number' && typeof lastPage.limit === 'number') {
        const currentItems = allPages.reduce((total, page) => total + (page.users?.length || 0), 0);
        const hasMore = currentItems < lastPage.total_users;
        
        if (hasMore) {
          return allPages.length + 1; // Return next page number
        }
      }
      
      // Method 3: Check if we have fewer items than requested (indicates end)
      if (lastPage.users && Array.isArray(lastPage.users)) {
        const usersCount = lastPage.users.length;
        const expectedLimit = limit || 20;
        
        // If we got fewer users than requested, we're at the end
        if (usersCount < expectedLimit) {
          return undefined;
        }
        
        // Otherwise, there might be more pages
        return allPages.length + 1;
      }
      
      console.warn('Unable to determine pagination info', lastPage);
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.fetchUserById(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    enabled: !!id && typeof id === 'number' && id > 0,
  });
}; 