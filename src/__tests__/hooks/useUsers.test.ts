import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUsers } from '../../hooks/useUsers';
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

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        refetchOnWindowFocus: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches users successfully', async () => {
    mockedUserService.fetchUsers.mockResolvedValue(mockUsersResponse);

    const { result } = renderHook(() => useUsers(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedUserService.fetchUsers).toHaveBeenCalledWith();
    expect(result.current.data).toEqual(mockUsersResponse);
  });

  test('handles invalid API response gracefully', async () => {
    const invalidResponse = {
      data: {
        users: null,
      },
    };
    mockedUserService.fetchUsers.mockResolvedValue(invalidResponse as any);

    const { result } = renderHook(() => useUsers(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(invalidResponse);
  });
}); 