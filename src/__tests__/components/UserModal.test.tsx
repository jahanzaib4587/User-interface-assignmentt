import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserModal } from '../../components/UserModal/UserModal';
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
  date_of_birth: '1990-01-01T00:00:00',
  latitude: 40.7128,
  longitude: -74.0060,
};

describe('UserModal Component', () => {
  const mockUseImageLoader = require('../../hooks/useImageLoader').useImageLoader;
  const mockOnClose = jest.fn();

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

  test('renders user information correctly when open', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} user={mockUser} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText('New York, NY 10001')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
  });

  test('does not render when closed', () => {
    render(<UserModal isOpen={false} onClose={mockOnClose} user={mockUser} />);

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  test('renders loading state', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} user={null} isLoading={true} />);

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });

  test('renders user image when available', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} user={mockUser} />);

    const image = screen.getByAltText('John Doe');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/john.jpg');
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

    render(<UserModal isOpen={true} onClose={mockOnClose} user={mockUser} />);

    const fallbackImages = screen.getAllByAltText('John Doe');
    expect(fallbackImages[0]).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} user={mockUser} />);

    const closeButton = screen.getByRole('button', { name: /close modal/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  test('formats date correctly', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} user={mockUser} />);

    expect(screen.getByText('January 1, 1990')).toBeInTheDocument();
  });

  test('formats phone number correctly', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} user={mockUser} />);

    expect(screen.getByText('(123) 456-7890')).toBeInTheDocument();
  });

  test('displays coordinates correctly', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} user={mockUser} />);

    expect(screen.getByText('40.712800, -74.006000')).toBeInTheDocument();
  });

  test('displays user ID correctly', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} user={mockUser} />);

    expect(screen.getByText('#0001')).toBeInTheDocument();
  });

  test('renders section headers correctly', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} user={mockUser} />);

    expect(screen.getByText('Contact Information')).toBeInTheDocument();
    expect(screen.getByText('Location Details')).toBeInTheDocument();
    expect(screen.getByText('Personal Details')).toBeInTheDocument();
  });

  test('handles missing user data gracefully', () => {
    const incompleteUser = {
      ...mockUser,
      first_name: '',
      last_name: '',
      job: '',
      email: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      country: '',
      date_of_birth: '',
      zipcode: '',
      latitude: undefined,
      longitude: undefined,
    } as any;

    render(<UserModal isOpen={true} onClose={mockOnClose} user={incompleteUser} />);

    expect(screen.getByText('Unknown User')).toBeInTheDocument();
    expect(screen.getByText('No job specified')).toBeInTheDocument();
    expect(screen.getByText('No email available')).toBeInTheDocument();
    expect(screen.getByText('No phone available')).toBeInTheDocument();
    expect(screen.getByText('No street address')).toBeInTheDocument();
    expect(screen.getByText('Unknown, Unknown Unknown')).toBeInTheDocument();
    expect(screen.getByText('Not specified')).toBeInTheDocument();
    expect(screen.getByText('Coordinates not available')).toBeInTheDocument();
  });

  test('returns null when user is null and not loading', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} user={null} isLoading={false} />);
    
    // When user is null and not loading, modal returns null, so no modal content should be present
    expect(screen.queryByText('Contact Information')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /close modal/i })).not.toBeInTheDocument();
  });

  test('returns null when not open and user is null', () => {
    render(<UserModal isOpen={false} onClose={mockOnClose} user={null} isLoading={false} />);
    
    // When modal is not open, no modal content should be present
    expect(screen.queryByText('Contact Information')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /close modal/i })).not.toBeInTheDocument();
  });

  test('handles female gender correctly', () => {
    const femaleUser = { ...mockUser, gender: 'female' };
    render(<UserModal isOpen={true} onClose={mockOnClose} user={femaleUser} />);

    expect(screen.getByText('Female')).toBeInTheDocument();
  });

  test('handles gender capitalization', () => {
    const userWithLowerGender = { ...mockUser, gender: 'male' };
    render(<UserModal isOpen={true} onClose={mockOnClose} user={userWithLowerGender} />);

    expect(screen.getByText('Male')).toBeInTheDocument();
  });

  test('handles missing zipcode', () => {
    const userWithoutZip = { ...mockUser, zipcode: '' };
    render(<UserModal isOpen={true} onClose={mockOnClose} user={userWithoutZip} />);

    expect(screen.getByText('ZIP: Unknown')).toBeInTheDocument();
  });

  test('renders image loading state', () => {
    mockUseImageLoader.mockReturnValue({
      isLoading: true,
      hasError: false,
      imageSrc: null,
      imageClasses: 'aspect-square object-cover',
      dimensions: null,
      aspectRatio: null,
    });

    render(<UserModal isOpen={true} onClose={mockOnClose} user={mockUser} />);

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });

  test('close button has correct accessibility attributes', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} user={mockUser} />);

    const closeButton = screen.getByRole('button', { name: /close modal/i });
    expect(closeButton).toHaveAttribute('aria-label', 'Close modal');
  });
}); 