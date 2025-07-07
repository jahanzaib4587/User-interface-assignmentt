import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useInfiniteUsers } from '../../hooks/useUsers';
import { userService } from '../../services/userService';

jest.mock('../../services/userService');

const mockedUserService = userService as jest.Mocked<typeof userService>;

const mockUserData = {
  id: 'user-123',
  username: 'johndoe',
  firstname: 'John',
  lastname: 'Doe',
  email: 'john@example.com',
  avatar: 'https://example.com/john.jpg',
  role: 'Developer',
  join_date: '1/15/2024',
  description: 'Experienced developer with expertise in React and TypeScript.',
};

const mockUsersResponse = {
  data: {
    users: [mockUserData],
  },
};

const createWrapper = (options?: { retry?: boolean }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: options?.retry ?? false,
        gcTime: 0,
      },
    },
  });
  
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };
};

describe('useInfiniteUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches users successfully with default parameters', async () => {
    mockedUserService.fetchUsers.mockResolvedValue(mockUsersResponse);

    const { result } = renderHook(() => useInfiniteUsers(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedUserService.fetchUsers).toHaveBeenCalledWith(1, 20);
    expect(result.current.data?.pages).toHaveLength(1);
    expect(result.current.data?.pages[0]).toEqual(mockUsersResponse);
  });

  test('fetches users with custom limit', async () => {
    mockedUserService.fetchUsers.mockResolvedValue(mockUsersResponse);

    const { result } = renderHook(() => useInfiniteUsers(10), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedUserService.fetchUsers).toHaveBeenCalledWith(1, 10);
    expect(result.current.data?.pages).toHaveLength(1);
    expect(result.current.data?.pages[0]).toEqual(mockUsersResponse);
  });

  test('handles negative limit values', async () => {
    mockedUserService.fetchUsers.mockResolvedValue(mockUsersResponse);

    const { result } = renderHook(() => useInfiniteUsers(-5), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedUserService.fetchUsers).toHaveBeenCalledWith(1, 1);
  });

  test('handles error state', async () => {
    const error = new Error('Network error');
    mockedUserService.fetchUsers.mockRejectedValue(error);

    const ErrorWrapper = ({ children }: { children: React.ReactNode }) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            gcTime: 0,
          },
        },
      });
      return React.createElement(QueryClientProvider, { client: queryClient }, children);
    };

    const { result } = renderHook(() => useInfiniteUsers(), {
      wrapper: ErrorWrapper,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeTruthy();
    expect(mockedUserService.fetchUsers).toHaveBeenCalledWith(1, 20);
  });

  test('determines next page correctly when users array is full', async () => {
    const fullPageResponse = {
      data: {
        users: Array(20).fill(mockUserData),
      },
    };
    mockedUserService.fetchUsers.mockResolvedValue(fullPageResponse);

    const { result } = renderHook(() => useInfiniteUsers(20), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.hasNextPage).toBe(true);
  });

  test('determines no next page when users array is partial', async () => {
    const partialPageResponse = {
      data: {
        users: Array(10).fill(mockUserData),
      },
    };
    mockedUserService.fetchUsers.mockResolvedValue(partialPageResponse);

    const { result } = renderHook(() => useInfiniteUsers(20), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.hasNextPage).toBe(false);
  });

  test('handles invalid API response gracefully', async () => {
    const invalidResponse = {
      data: {
        users: null,
      },
    };
    mockedUserService.fetchUsers.mockResolvedValue(invalidResponse as any);

    const { result } = renderHook(() => useInfiniteUsers(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.hasNextPage).toBe(false);
  });
}); 