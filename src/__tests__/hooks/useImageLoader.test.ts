import { renderHook, act } from '@testing-library/react';
import { useImageLoader } from '../../hooks/useImageLoader';

// Mock the image helpers with simpler implementations
jest.mock('../../utils/imageHelpers', () => ({
  getImageDimensions: jest.fn().mockResolvedValue({ width: 400, height: 400 }),
  getAspectRatio: jest.fn().mockReturnValue(1.0),
  getImageClasses: jest.fn().mockReturnValue('aspect-square object-cover'),
}));

describe('useImageLoader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('initializes with correct default state', () => {
    const { result } = renderHook(() => useImageLoader(''));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(false);
    expect(result.current.imageSrc).toBe(null);
    expect(result.current.imageClasses).toBe('aspect-square object-cover');
    expect(result.current.dimensions).toBe(null);
    expect(result.current.aspectRatio).toBe(null);
  });

  test('starts loading when given a valid URL', () => {
    const { result } = renderHook(() => useImageLoader('https://example.com/image.jpg'));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasError).toBe(false);
    expect(result.current.imageSrc).toBe(null);
  });

  test('handles empty src', () => {
    const { result } = renderHook(() => useImageLoader(''));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(false);
    expect(result.current.imageSrc).toBe(null);
    expect(result.current.imageClasses).toBe('aspect-square object-cover');
    expect(result.current.dimensions).toBe(null);
    expect(result.current.aspectRatio).toBe(null);
  });

  test('handles null src', () => {
    const { result } = renderHook(() => useImageLoader(null as any));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(false);
    expect(result.current.imageSrc).toBe(null);
    expect(result.current.imageClasses).toBe('aspect-square object-cover');
    expect(result.current.dimensions).toBe(null);
    expect(result.current.aspectRatio).toBe(null);
  });

  test('handles undefined src', () => {
    const { result } = renderHook(() => useImageLoader(undefined as any));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(false);
    expect(result.current.imageSrc).toBe(null);
    expect(result.current.imageClasses).toBe('aspect-square object-cover');
    expect(result.current.dimensions).toBe(null);
    expect(result.current.aspectRatio).toBe(null);
  });

  test('resets state when src changes', () => {
    const { result, rerender } = renderHook(
      ({ src }) => useImageLoader(src),
      { initialProps: { src: 'https://example.com/image1.jpg' } }
    );

    expect(result.current.isLoading).toBe(true);

    // Change to empty src
    rerender({ src: '' });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(false);
    expect(result.current.imageSrc).toBe(null);
    expect(result.current.imageClasses).toBe('aspect-square object-cover');
    expect(result.current.dimensions).toBe(null);
    expect(result.current.aspectRatio).toBe(null);
  });

  test('handles src changes from valid to valid', () => {
    const { result, rerender } = renderHook(
      ({ src }) => useImageLoader(src),
      { initialProps: { src: 'https://example.com/image1.jpg' } }
    );

    expect(result.current.isLoading).toBe(true);

    // Change to different valid src
    rerender({ src: 'https://example.com/image2.jpg' });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasError).toBe(false);
  });

  test('returns correct interface structure', () => {
    const { result } = renderHook(() => useImageLoader('https://example.com/image.jpg'));

    // Check that all expected properties are present
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('hasError');
    expect(result.current).toHaveProperty('imageSrc');
    expect(result.current).toHaveProperty('imageClasses');
    expect(result.current).toHaveProperty('dimensions');
    expect(result.current).toHaveProperty('aspectRatio');

    // Check types
    expect(typeof result.current.isLoading).toBe('boolean');
    expect(typeof result.current.hasError).toBe('boolean');
    expect(typeof result.current.imageClasses).toBe('string');
  });

  test('initializes with loading state for valid URLs', () => {
    const testUrls = [
      'https://example.com/image.jpg',
      'http://test.com/photo.png',
      'https://site.com/picture.gif'
    ];

    testUrls.forEach(url => {
      const { result } = renderHook(() => useImageLoader(url));
      expect(result.current.isLoading).toBe(true);
      expect(result.current.hasError).toBe(false);
    });
  });

  test('maintains stable object references for null values', () => {
    const { result, rerender } = renderHook(() => useImageLoader(''));

    const firstDimensions = result.current.dimensions;
    const firstAspectRatio = result.current.aspectRatio;

    rerender();

    expect(result.current.dimensions).toBe(firstDimensions);
    expect(result.current.aspectRatio).toBe(firstAspectRatio);
  });

  test('cleans up properly on unmount', () => {
    const { unmount } = renderHook(() => useImageLoader('https://example.com/image.jpg'));
    
    // Should not throw any errors on unmount
    expect(() => unmount()).not.toThrow();
  });

  test('handles rapid src changes gracefully', () => {
    const { rerender } = renderHook(
      ({ src }) => useImageLoader(src),
      { initialProps: { src: 'https://example.com/image1.jpg' } }
    );

    // Rapidly change src multiple times
    expect(() => {
      rerender({ src: 'https://example.com/image2.jpg' });
      rerender({ src: 'https://example.com/image3.jpg' });
      rerender({ src: 'https://example.com/image4.jpg' });
      rerender({ src: '' });
      rerender({ src: 'https://example.com/image5.jpg' });
    }).not.toThrow();
  });
}); 