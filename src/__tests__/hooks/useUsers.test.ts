import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useUsers, useInfiniteUsers, useUser } from '../../hooks/useUsers';
import { userService } from '../../services/userService';

// Mock userService
jest.mock('../../services/userService');
const mockedUserService = userService as jest.Mocked<typeof userService>;

const mockUserData = {
  id: 1,
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  gender: 'male',
  job: 'Developer',
  city: 'New York',
  state: 'NY',
  country: 'USA',
  profile_picture: 'https://example.com/john.jpg',
  phone: '123-456-7890',
  street: '123 Main St',
  zipcode: '10001',
  date_of_birth: '1990-01-01',
  latitude: 40.7128,
  longitude: -74.0060,
};

const mockUsersResponse = {
  success: true,
  message: 'Users fetched',
  users: [mockUserData],
  pagination: {
    current_page: 1,
    per_page: 20,
    total: 100,
    total_pages: 5,
  },
};

const mockSingleUserResponse = {
  success: true,
  message: 'User fetched',
  user: mockUserData,
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

describe('useUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches users successfully with default parameters', async () => {
    mockedUserService.fetchUsers.mockResolvedValue(mockUsersResponse);

    const { result } = renderHook(() => useUsers(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedUserService.fetchUsers).toHaveBeenCalledWith(1, 20);
    expect(result.current.data).toEqual(mockUsersResponse);
  });

  test('fetches users with custom page and limit', async () => {
    mockedUserService.fetchUsers.mockResolvedValue(mockUsersResponse);

    const { result } = renderHook(() => useUsers(2, 10), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedUserService.fetchUsers).toHaveBeenCalledWith(2, 10);
  });

  test('handles negative page and limit values', async () => {
    mockedUserService.fetchUsers.mockResolvedValue(mockUsersResponse);

    const { result } = renderHook(() => useUsers(-1, -5), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Should be corrected to minimum values
    expect(mockedUserService.fetchUsers).toHaveBeenCalledWith(1, 1);
  });

  test('handles error state', async () => {
    const error = new Error('Network error');
    mockedUserService.fetchUsers.mockRejectedValue(error);

    // Create a more aggressive query client for error testing
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 0,
          retryDelay: 0,
          gcTime: 0,
          staleTime: 0,
          networkMode: 'always',
        },
      },
    });

    const ErrorWrapper = ({ children }: { children: React.ReactNode }) => 
      React.createElement(QueryClientProvider, { client: queryClient }, children);

    const { result } = renderHook(() => useUsers(), {
      wrapper: ErrorWrapper,
    });

    // First wait for the query to start
    await waitFor(() => {
      expect(result.current.isLoading || result.current.isError).toBe(true);
    });

    // Then wait for the error state
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    }, { timeout: 2000 });

    expect(result.current.error).toEqual(error);
  });
});

describe('useInfiniteUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
    console.warn = jest.fn();
  });

  test('fetches infinite users successfully', async () => {
    mockedUserService.fetchUsers.mockResolvedValue(mockUsersResponse);

    const { result } = renderHook(() => useInfiniteUsers(20), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedUserService.fetchUsers).toHaveBeenCalledWith(1, 20);
    expect(result.current.data?.pages).toHaveLength(1);
    expect(result.current.data?.pages[0]).toEqual(mockUsersResponse);
  });

  test('handles custom limit', async () => {
    mockedUserService.fetchUsers.mockResolvedValue(mockUsersResponse);

    const { result } = renderHook(() => useInfiniteUsers(10), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedUserService.fetchUsers).toHaveBeenCalledWith(1, 10);
  });

  test('handles negative limit value', async () => {
    mockedUserService.fetchUsers.mockResolvedValue(mockUsersResponse);

    const { result } = renderHook(() => useInfiniteUsers(-5), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedUserService.fetchUsers).toHaveBeenCalledWith(1, 1);
  });

  test('determines next page correctly with pagination', async () => {
    const responseWithNextPage = {
      ...mockUsersResponse,
      pagination: {
        current_page: 1,
        per_page: 20,
        total: 100,
        total_pages: 5,
      },
    };

    mockedUserService.fetchUsers.mockResolvedValue(responseWithNextPage);

    const { result } = renderHook(() => useInfiniteUsers(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.hasNextPage).toBe(true);
  });

  test('handles last page correctly', async () => {
    const lastPageResponse = {
      ...mockUsersResponse,
      pagination: {
        current_page: 5,
        per_page: 20,
        total: 100,
        total_pages: 5,
      },
    };

    mockedUserService.fetchUsers.mockResolvedValue(lastPageResponse);

    const { result } = renderHook(() => useInfiniteUsers(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.hasNextPage).toBe(false);
  });

  test('handles missing pagination data', async () => {
    const responseWithoutPagination = {
      success: true,
      message: 'Users fetched',
      users: [mockUserData],
    };

    mockedUserService.fetchUsers.mockResolvedValue(responseWithoutPagination as any);

    const { result } = renderHook(() => useInfiniteUsers(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(console.log).toHaveBeenCalledWith(
      'getNextPageParam called with:',
      expect.objectContaining({
        lastPage: responseWithoutPagination,
      })
    );
  });

  test('handles alternative pagination structure', async () => {
    const alternativeResponse = {
      success: true,
      message: 'Users fetched',
      users: [mockUserData],
      total_users: 100,
      offset: 0,
      limit: 20,
    };

    mockedUserService.fetchUsers.mockResolvedValue(alternativeResponse as any);

    const { result } = renderHook(() => useInfiniteUsers(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.hasNextPage).toBe(true);
  });

  test('handles error state', async () => {
    const error = new Error('Network error');
    mockedUserService.fetchUsers.mockRejectedValue(error);

    // Create a more aggressive query client for error testing
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 0,
          retryDelay: 0,
          gcTime: 0,
          staleTime: 0,
          networkMode: 'always',
        },
      },
    });

    const ErrorWrapper = ({ children }: { children: React.ReactNode }) => 
      React.createElement(QueryClientProvider, { client: queryClient }, children);

    const { result } = renderHook(() => useInfiniteUsers(), {
      wrapper: ErrorWrapper,
    });

    // First wait for the query to start
    await waitFor(() => {
      expect(result.current.isLoading || result.current.isError).toBe(true);
    });

    // Then wait for the error state
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    }, { timeout: 2000 });

    expect(result.current.error).toEqual(error);
  });
});

describe('useUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches single user successfully', async () => {
    mockedUserService.fetchUserById.mockResolvedValue(mockSingleUserResponse);

    const { result } = renderHook(() => useUser(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedUserService.fetchUserById).toHaveBeenCalledWith(1);
    expect(result.current.data).toEqual(mockSingleUserResponse);
  });

  test('is disabled for invalid user IDs', () => {
    const { result: zeroResult } = renderHook(() => useUser(0), {
      wrapper: createWrapper(),
    });

    const { result: negativeResult } = renderHook(() => useUser(-1), {
      wrapper: createWrapper(),
    });

    const { result: nonNumberResult } = renderHook(() => useUser('abc' as any), {
      wrapper: createWrapper(),
    });

    expect(zeroResult.current.isLoading).toBe(false);
    expect(negativeResult.current.isLoading).toBe(false);
    expect(nonNumberResult.current.isLoading).toBe(false);

    expect(mockedUserService.fetchUserById).not.toHaveBeenCalled();
  });

  test('handles error state', async () => {
    const error = new Error('User not found');
    mockedUserService.fetchUserById.mockRejectedValue(error);

    // Create a more aggressive query client for error testing
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 0,
          retryDelay: 0,
          gcTime: 0,
          staleTime: 0,
          networkMode: 'always',
        },
      },
    });

    const ErrorWrapper = ({ children }: { children: React.ReactNode }) => 
      React.createElement(QueryClientProvider, { client: queryClient }, children);

    const { result } = renderHook(() => useUser(999), {
      wrapper: ErrorWrapper,
    });

    // First wait for the query to start
    await waitFor(() => {
      expect(result.current.isLoading || result.current.isError).toBe(true);
    });

    // Then wait for the error state
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    }, { timeout: 2000 });

    expect(result.current.error).toEqual(error);
  });

  test('is enabled for valid user ID', () => {
    mockedUserService.fetchUserById.mockResolvedValue(mockSingleUserResponse);

    renderHook(() => useUser(123), {
      wrapper: createWrapper(),
    });

    expect(mockedUserService.fetchUserById).toHaveBeenCalledWith(123);
  });
}); 