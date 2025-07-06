import { renderHook, act } from '@testing-library/react';
import { useImageLoader } from '../../hooks/useImageLoader';

describe('useImageLoader', () => {
  let mockImage: any;

  beforeEach(() => {
    mockImage = {
      onload: null,
      onerror: null,
      src: '',
    };

    // Mock Image constructor
    global.Image = jest.fn(() => mockImage) as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('initializes with loading state', () => {
    const { result } = renderHook(() => useImageLoader('https://example.com/image.jpg'));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasError).toBe(false);
    expect(result.current.imageSrc).toBe(null);
  });

  test('handles successful image load', async () => {
    const { result } = renderHook(() => useImageLoader('https://example.com/image.jpg'));

    // Simulate successful image load
    act(() => {
      if (mockImage.onload) {
        mockImage.onload();
      }
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(false);
    expect(result.current.imageSrc).toBe('https://example.com/image.jpg');
  });

  test('handles image load error', async () => {
    const { result } = renderHook(() => useImageLoader('https://example.com/invalid.jpg'));

    // Simulate image load error
    act(() => {
      if (mockImage.onerror) {
        mockImage.onerror();
      }
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(true);
    expect(result.current.imageSrc).toBe(null);
  });

  test('handles empty src', () => {
    const { result } = renderHook(() => useImageLoader(''));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(true);
    expect(result.current.imageSrc).toBe(null);
  });

  test('handles null src', () => {
    const { result } = renderHook(() => useImageLoader(null as any));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(true);
    expect(result.current.imageSrc).toBe(null);
  });

  test('handles undefined src', () => {
    const { result } = renderHook(() => useImageLoader(undefined as any));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(true);
    expect(result.current.imageSrc).toBe(null);
  });

  test('resets state when src changes', () => {
    const { result, rerender } = renderHook(
      ({ src }) => useImageLoader(src),
      { initialProps: { src: 'https://example.com/image1.jpg' } }
    );

    // First load completes successfully
    act(() => {
      if (mockImage.onload) {
        mockImage.onload();
      }
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(false);
    expect(result.current.imageSrc).toBe('https://example.com/image1.jpg');

    // Change src
    rerender({ src: 'https://example.com/image2.jpg' });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasError).toBe(false);
  });

  test('cleans up event handlers on unmount', () => {
    const { unmount } = renderHook(() => useImageLoader('https://example.com/image.jpg'));

    expect(mockImage.onload).not.toBe(null);
    expect(mockImage.onerror).not.toBe(null);

    unmount();

    expect(mockImage.onload).toBe(null);
    expect(mockImage.onerror).toBe(null);
  });

  test('cleans up event handlers when src changes', () => {
    let firstImageRef: any;
    
    // Mock Image constructor to capture the first image
    const originalMockImage = mockImage;
    global.Image = jest.fn(() => {
      if (!firstImageRef) {
        firstImageRef = { ...originalMockImage };
        return firstImageRef;
      }
      return { ...originalMockImage };
    }) as any;

    const { rerender } = renderHook(
      ({ src }) => useImageLoader(src),
      { initialProps: { src: 'https://example.com/image1.jpg' } }
    );

    // Change src - should create new image and clean up old one
    rerender({ src: 'https://example.com/image2.jpg' });

    // The cleanup happens in useEffect, so the handlers should be nullified
    expect(firstImageRef.onload).toBe(null);
    expect(firstImageRef.onerror).toBe(null);
  });

  test('sets correct src on image element', () => {
    renderHook(() => useImageLoader('https://example.com/test.jpg'));

    expect(mockImage.src).toBe('https://example.com/test.jpg');
  });

  test('handles rapid src changes', () => {
    const { rerender } = renderHook(
      ({ src }) => useImageLoader(src),
      { initialProps: { src: 'https://example.com/image1.jpg' } }
    );

    // Rapidly change src multiple times
    rerender({ src: 'https://example.com/image2.jpg' });
    rerender({ src: 'https://example.com/image3.jpg' });
    rerender({ src: 'https://example.com/image4.jpg' });

    // Should handle gracefully without errors
    expect(global.Image).toHaveBeenCalledTimes(4);
  });

  test('does not update state after unmount', () => {
    const { result, unmount } = renderHook(() => useImageLoader('https://example.com/image.jpg'));

    unmount();

    // Try to trigger load after unmount - should not crash
    act(() => {
      if (mockImage.onload) {
        mockImage.onload();
      }
    });

    // State should remain as it was before unmount
    expect(result.current.isLoading).toBe(true);
  });
}); 