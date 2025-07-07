import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserModal } from '../../components/UserModal';
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

  test('renders user information correctly', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} user={mockUser} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getAllByText('Developer')).toHaveLength(2);
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getAllByText('@johndoe')).toHaveLength(2);
    expect(screen.getByText('Joined: 1/15/2024')).toBeInTheDocument();
  });

  test('renders user image when available', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} user={mockUser} />);

    const image = screen.getByAltText('John Doe');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/john.jpg');
  });

  test('renders loading state when image is loading', () => {
    mockUseImageLoader.mockReturnValue({
      isLoading: true,
      hasError: false,
      imageSrc: null,
      imageClasses: '',
      dimensions: null,
      aspectRatio: null,
    });

    render(<UserModal isOpen={true} onClose={mockOnClose} user={mockUser} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('renders fallback avatar when image has error', () => {
    mockUseImageLoader.mockReturnValue({
      isLoading: false,
      hasError: true,
      imageSrc: null,
      imageClasses: '',
      dimensions: null,
      aspectRatio: null,
    });

    render(<UserModal isOpen={true} onClose={mockOnClose} user={mockUser} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} user={mockUser} />);

    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('does not render when isOpen is false', () => {
    render(<UserModal isOpen={false} onClose={mockOnClose} user={mockUser} />);

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  test('renders loading state when isLoading is true', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} user={null} isLoading={true} />);

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  test('handles missing user data gracefully', () => {
    const incompleteUser = {
      id: 'user-123',
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      avatar: '',
      role: '',
      join_date: '',
      description: '',
    };

    render(<UserModal isOpen={true} onClose={mockOnClose} user={incompleteUser} />);

    expect(screen.getByText('Unknown User')).toBeInTheDocument();
    expect(screen.getAllByText('No role specified')).toHaveLength(2);
    expect(screen.getByText('No email available')).toBeInTheDocument();
    expect(screen.getAllByText('@unknown')).toHaveLength(2);
    expect(screen.getByText('Joined: Unknown')).toBeInTheDocument();
  });

  test('renders email as link when available', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} user={mockUser} />);

    const emailLink = screen.getByRole('link', { name: 'john@example.com' });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:john@example.com');
  });

  test('displays username correctly', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} user={mockUser} />);

    const usernameElements = screen.getAllByText('@johndoe');
    expect(usernameElements).toHaveLength(2);
  });

  test('displays description correctly', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} user={mockUser} />);

    expect(screen.getByText('Experienced developer with expertise in React and TypeScript.')).toBeInTheDocument();
  });

  test('handles missing description gracefully', () => {
    const userWithoutDescription = {
      ...mockUser,
      description: '',
    };

    render(<UserModal isOpen={true} onClose={mockOnClose} user={userWithoutDescription} />);

    expect(screen.getByText('No description available')).toBeInTheDocument();
  });

  test('displays user ID correctly', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} user={mockUser} />);

    expect(screen.getByText('user-123')).toBeInTheDocument();
  });

  test('renders with null user', () => {
    render(<UserModal isOpen={true} onClose={mockOnClose} user={null} />);

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });
}); 