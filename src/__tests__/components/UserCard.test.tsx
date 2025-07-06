import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserCard } from '../../components/UserCard/UserCard';
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

describe('UserCard Component', () => {
  const mockUseImageLoader = require('../../hooks/useImageLoader').useImageLoader;
  const mockOnViewMore = jest.fn();

  beforeEach(() => {
      mockUseImageLoader.mockReturnValue({
    isLoading: false,
    hasError: false,
    imageSrc: 'https://example.com/john.jpg',
    imageClasses: 'aspect-square object-cover',
    dimensions: { width: 400, height: 400 },
    aspectRatio: 1.0,
  });
    jest.clearAllMocks();
  });

  test('renders user information correctly', () => {
    render(<UserCard user={mockUser} onViewMore={mockOnViewMore} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getAllByText('john@example.com')).toHaveLength(2); // Appears twice in the component
    expect(screen.getByText('New York, NY, USA')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
  });

  test('renders user image when available', () => {
    render(<UserCard user={mockUser} onViewMore={mockOnViewMore} />);

    const image = screen.getByAltText('John Doe');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/john.jpg');
  });

  test('renders loading state when image is loading', () => {
    mockUseImageLoader.mockReturnValue({
      isLoading: true,
      hasError: false,
      imageSrc: null,
      imageClasses: 'aspect-square object-cover',
      dimensions: null,
      aspectRatio: null,
    });

    render(<UserCard user={mockUser} onViewMore={mockOnViewMore} />);

    const loadingSpinner = document.querySelector('.animate-spin');
    expect(loadingSpinner).toBeInTheDocument();
  });

  test('renders fallback avatar when image has error', () => {
    mockUseImageLoader.mockReturnValue({
      isLoading: false,
      hasError: true,
      imageSrc: null,
      imageClasses: 'aspect-square object-cover',
      dimensions: null,
      aspectRatio: null,
    });

    render(<UserCard user={mockUser} onViewMore={mockOnViewMore} />);

    const fallbackImage = screen.getByAltText('John Doe');
    expect(fallbackImage).toBeInTheDocument();
    // Check that the generateAvatarFallback function was called
    expect(require('../../utils/imageHelpers').generateAvatarFallback).toHaveBeenCalledWith('John', 'Doe');
  });

  test('calls onViewMore when View More button is clicked', () => {
    render(<UserCard user={mockUser} onViewMore={mockOnViewMore} />);

    const viewMoreButton = screen.getByText('View More');
    fireEvent.click(viewMoreButton);

    expect(mockOnViewMore).toHaveBeenCalledWith(1);
  });

  test('renders female gender badge correctly', () => {
    const femaleUser = { ...mockUser, gender: 'female' };
    render(<UserCard user={femaleUser} onViewMore={mockOnViewMore} />);

    expect(screen.getByText('Female')).toBeInTheDocument();
  });

  test('handles missing user data gracefully', () => {
    const incompleteUser = {
      ...mockUser,
      first_name: '',
      last_name: '',
      job: '',
      email: '',
      city: '',
      state: '',
      country: '',
      gender: '',
    };

    render(<UserCard user={incompleteUser} onViewMore={mockOnViewMore} />);

    expect(screen.getByText('Unknown User')).toBeInTheDocument();
    expect(screen.getByText('No job specified')).toBeInTheDocument();
    expect(screen.getByText('No email available')).toBeInTheDocument();
    expect(screen.getByText('Unknown, Unknown, Unknown')).toBeInTheDocument();
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  test('returns null for null user', () => {
    const { container } = render(<UserCard user={null as any} onViewMore={mockOnViewMore} />);
    expect(container.firstChild).toBeNull();
  });

  test('handles undefined user properties', () => {
    const userWithUndefined = {
      ...mockUser,
      first_name: undefined,
      last_name: undefined,
    } as any;

    render(<UserCard user={userWithUndefined} onViewMore={mockOnViewMore} />);

    expect(screen.getByText('Unknown User')).toBeInTheDocument();
  });

  test('renders with correct CSS classes', () => {
    render(<UserCard user={mockUser} onViewMore={mockOnViewMore} />);

    // Find the main card container by its classes
    const cardContainer = document.querySelector('.bg-white.rounded-lg.shadow-md');
    expect(cardContainer).toBeInTheDocument();
  });

  test('gender badge has correct styling for male', () => {
    render(<UserCard user={mockUser} onViewMore={mockOnViewMore} />);

    const genderBadge = screen.getByText('Male');
    expect(genderBadge).toHaveClass('bg-blue-100', 'text-blue-800');
  });

  test('gender badge has correct styling for female', () => {
    const femaleUser = { ...mockUser, gender: 'female' };
    render(<UserCard user={femaleUser} onViewMore={mockOnViewMore} />);

    const genderBadge = screen.getByText('Female');
    expect(genderBadge).toHaveClass('bg-pink-100', 'text-pink-800');
  });
}); 