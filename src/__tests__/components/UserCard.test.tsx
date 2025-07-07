import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserCard } from '../../components/UserCard';
import { User } from '../../types/user';

// Mock the useImageLoader hook
jest.mock('../../hooks/useImageLoader', () => ({
  useImageLoader: jest.fn(),
}));

// Mock the image helpers
jest.mock('../../utils/imageHelpers', () => ({
  generateAvatarFallback: jest.fn(() => 'data:image/svg+xml;base64,mock-avatar'),
}));

const mockUser: User = {
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

describe('UserCard Component', () => {
  const mockOnViewMore = jest.fn();
  const mockUseImageLoader = require('../../hooks/useImageLoader').useImageLoader;

  beforeEach(() => {
    mockOnViewMore.mockClear();
    mockUseImageLoader.mockReturnValue({
      isLoading: false,
      hasError: false,
      imageSrc: 'https://example.com/john.jpg',
    });
  });

  test('renders user information correctly', () => {
    render(<UserCard user={mockUser} onViewMore={mockOnViewMore} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('1/15/2024')).toBeInTheDocument();
    expect(screen.getByText('Experienced developer with expertise in React and TypeScript.')).toBeInTheDocument();
  });

  test('calls onViewMore when View More button is clicked', () => {
    render(<UserCard user={mockUser} onViewMore={mockOnViewMore} />);

    const viewButton = screen.getByText('View More');
    fireEvent.click(viewButton);

    expect(mockOnViewMore).toHaveBeenCalledWith('user-123');
  });

  test('displays profile image when available', () => {
    render(<UserCard user={mockUser} onViewMore={mockOnViewMore} />);

    const profileImage = screen.getByAltText('John Doe profile');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute('src', 'https://example.com/john.jpg');
  });

  test('handles image loading error', () => {
    mockUseImageLoader.mockReturnValue({
      isLoading: false,
      hasError: true,
      imageSrc: null,
    });

    render(<UserCard user={mockUser} onViewMore={mockOnViewMore} />);

    // Check that the fallback avatar is used
    expect(require('../../utils/imageHelpers').generateAvatarFallback).toHaveBeenCalledWith('John', 'Doe');
  });

  test('handles missing user data gracefully', () => {
    const userWithMissingData = {
      ...mockUser,
      firstname: '',
      lastname: '',
      role: '',
      join_date: '',
      description: '',
    };

    render(<UserCard user={userWithMissingData} onViewMore={mockOnViewMore} />);

    expect(screen.getByText('Unknown User')).toBeInTheDocument();
    expect(screen.getByText('Member')).toBeInTheDocument();
    expect(screen.getByText('No description available')).toBeInTheDocument();
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  test('truncates long names correctly', () => {
    const userWithLongName = {
      ...mockUser,
      firstname: 'VeryLongFirstNameThatShouldBeTruncated',
      lastname: 'VeryLongLastNameThatShouldBeTruncated',
    };

    render(<UserCard user={userWithLongName} onViewMore={mockOnViewMore} />);

    expect(screen.getByText('VeryLongFirstNameTha...')).toBeInTheDocument();
  });

  test('truncates long descriptions correctly', () => {
    const userWithLongDescription = {
      ...mockUser,
      description: 'This is a very long description that should be truncated because it exceeds the maximum length that we have set for the description field in the user card component.',
    };

    render(<UserCard user={userWithLongDescription} onViewMore={mockOnViewMore} />);

    // Check that some part of the description is visible (truncated)
    expect(screen.getByText(/This is a very long description that should be truncated/)).toBeInTheDocument();
  });

  test('displays join date correctly', () => {
    render(<UserCard user={mockUser} onViewMore={mockOnViewMore} />);

    expect(screen.getByText('1/15/2024')).toBeInTheDocument();
  });

  test('handles missing join date', () => {
    const userWithoutJoinDate = {
      ...mockUser,
      join_date: '',
    };

    render(<UserCard user={userWithoutJoinDate} onViewMore={mockOnViewMore} />);

    expect(screen.queryByText('1/15/2024')).not.toBeInTheDocument();
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  test('displays joined label correctly', () => {
    render(<UserCard user={mockUser} onViewMore={mockOnViewMore} />);

    expect(screen.getByText('Joined')).toBeInTheDocument();
  });
}); 