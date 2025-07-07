import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

// Mock the hooks and services
jest.mock('./hooks/useUsers', () => ({
  useUsers: jest.fn(),
}));

jest.mock('./hooks/useModal', () => ({
  useModal: jest.fn(),
}));

const mockUsers = [
  {
    id: 'user-123',
    username: 'johndoe',
    firstname: 'John',
    lastname: 'Doe',
    email: 'john@example.com',
    avatar: 'https://example.com/john.jpg',
    role: 'Developer',
    join_date: '1/15/2024',
    description: 'Experienced developer with expertise in React and TypeScript.',
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
  const mockUseUsers = require('./hooks/useUsers').useUsers;
  const mockUseModal = require('./hooks/useModal').useModal;

  beforeEach(() => {
    mockUseUsers.mockReturnValue({
      data: {
        data: { users: mockUsers },
      },
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    mockUseModal.mockReturnValue({
      isOpen: false,
      selectedUserId: null,
      openModal: jest.fn(),
      closeModal: jest.fn(),
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
    expect(screen.getByText('Developer')).toBeInTheDocument();
  });

  test('renders loading skeletons when loading', () => {
    mockUseUsers.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    });

    renderWithQueryClient(<App />);
    expect(screen.getAllByTestId('user-card-skeleton')).toHaveLength(20);
  });

  test('renders error state when there is an error', () => {
    mockUseUsers.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Network error'),
      refetch: jest.fn(),
    });

    renderWithQueryClient(<App />);
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
  });

  test('shows user counter when users are loaded', () => {
    renderWithQueryClient(<App />);
    expect(screen.getByText('1 of 1 users loaded')).toBeInTheDocument();
  });

  test('handles retry on error', () => {
    const mockRefetch = jest.fn();
    mockUseUsers.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Network error'),
      refetch: mockRefetch,
    });

    renderWithQueryClient(<App />);
    
    const retryButton = screen.getByText('Try Again');
    fireEvent.click(retryButton);
    
    expect(mockRefetch).toHaveBeenCalled();
  });
});
