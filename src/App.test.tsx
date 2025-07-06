import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

// Mock the hooks and services
jest.mock('./hooks/useUsers', () => ({
  useInfiniteUsers: jest.fn(),
  useUser: jest.fn(),
}));

jest.mock('./hooks/useModal', () => ({
  useModal: jest.fn(),
}));

jest.mock('./hooks/useInfiniteScroll', () => ({
  useInfiniteScroll: jest.fn(),
}));

const mockUsers = [
  {
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
  },
];

const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('App Component', () => {
  const mockUseInfiniteUsers = require('./hooks/useUsers').useInfiniteUsers;
  const mockUseUser = require('./hooks/useUsers').useUser;
  const mockUseModal = require('./hooks/useModal').useModal;
  const mockUseInfiniteScroll = require('./hooks/useInfiniteScroll').useInfiniteScroll;

  beforeEach(() => {
    mockUseInfiniteUsers.mockReturnValue({
      data: {
        pages: [{ users: mockUsers, pagination: { total: 100 } }],
      },
      isLoading: false,
      isFetchingNextPage: false,
      hasNextPage: true,
      fetchNextPage: jest.fn(),
      error: null,
      refetch: jest.fn(),
    });

    mockUseUser.mockReturnValue({
      data: null,
    });

    mockUseModal.mockReturnValue({
      isOpen: false,
      selectedUserId: null,
      openModal: jest.fn(),
      closeModal: jest.fn(),
    });

    mockUseInfiniteScroll.mockReturnValue({
      loadMoreRef: { current: null },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders User Directory title', () => {
    renderWithQueryClient(<App />);
    expect(screen.getByText('User Directory')).toBeInTheDocument();
  });

  test('renders user cards when data is available', () => {
    renderWithQueryClient(<App />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument(); // Email appears once per card
  });

  test('renders loading skeletons when loading', () => {
    mockUseInfiniteUsers.mockReturnValue({
      data: { pages: [] },
      isLoading: true,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      error: null,
      refetch: jest.fn(),
    });

    renderWithQueryClient(<App />);
    expect(screen.getAllByTestId('user-card-skeleton')).toHaveLength(20);
  });

  test('renders error state when there is an error', () => {
    mockUseInfiniteUsers.mockReturnValue({
      data: null,
      isLoading: false,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      error: new Error('Network error'),
      refetch: jest.fn(),
    });

    renderWithQueryClient(<App />);
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
  });

  test('shows user counter when users are loaded', () => {
    renderWithQueryClient(<App />);
    expect(screen.getByText('1 of 100 users loaded')).toBeInTheDocument();
  });

  test('handles retry on error', () => {
    const mockRefetch = jest.fn();
    mockUseInfiniteUsers.mockReturnValue({
      data: null,
      isLoading: false,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      error: new Error('Network error'),
      refetch: mockRefetch,
    });

    renderWithQueryClient(<App />);
    
    const retryButton = screen.getByText('Try Again');
    fireEvent.click(retryButton);
    
    expect(mockRefetch).toHaveBeenCalled();
  });

  test('renders Load More button when hasNextPage is true', () => {
    renderWithQueryClient(<App />);
    expect(screen.getByText('Load More Users')).toBeInTheDocument();
  });

  test('handles Load More button click', () => {
    const mockFetchNextPage = jest.fn();
    mockUseInfiniteUsers.mockReturnValue({
      data: {
        pages: [{ users: mockUsers, pagination: { total: 100 } }],
      },
      isLoading: false,
      isFetchingNextPage: false,
      hasNextPage: true,
      fetchNextPage: mockFetchNextPage,
      error: null,
      refetch: jest.fn(),
    });

    renderWithQueryClient(<App />);
    
    const loadMoreButton = screen.getByText('Load More Users');
    fireEvent.click(loadMoreButton);
    
    expect(mockFetchNextPage).toHaveBeenCalled();
  });
});
