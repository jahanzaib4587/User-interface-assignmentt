import {
  getImageDimensions,
  getAspectRatio,
  getImageClasses,
  generateAvatarFallback,
  isValidImageUrl,
} from '../../utils/imageHelpers';

describe('imageHelpers', () => {
  describe('getImageDimensions', () => {
    test('resolves with dimensions when image loads successfully', async () => {
      const mockImage = {
        naturalWidth: 100,
        naturalHeight: 200,
        onload: null as any,
        onerror: null as any,
      };

      // Mock Image constructor
      global.Image = jest.fn(() => mockImage) as any;

      const promise = getImageDimensions('https://example.com/image.jpg');
      
      // Simulate successful load
      setTimeout(() => {
        if (mockImage.onload) mockImage.onload();
      }, 0);

      const result = await promise;
      expect(result).toEqual({ width: 100, height: 200 });
    });

    test('rejects when image fails to load', async () => {
      const mockImage = {
        naturalWidth: 0,
        naturalHeight: 0,
        onload: null as any,
        onerror: null as any,
      };

      global.Image = jest.fn(() => mockImage) as any;

      const promise = getImageDimensions('https://example.com/invalid.jpg');
      
      // Simulate error
      setTimeout(() => {
        if (mockImage.onerror) mockImage.onerror();
      }, 0);

      await expect(promise).rejects.toThrow('Failed to load image');
    });
  });

  describe('getAspectRatio', () => {
    test('calculates aspect ratio correctly', () => {
      expect(getAspectRatio(100, 50)).toBe(2);
      expect(getAspectRatio(50, 100)).toBe(0.5);
      expect(getAspectRatio(100, 100)).toBe(1);
    });

    test('handles zero height', () => {
      expect(getAspectRatio(100, 0)).toBe(Infinity);
    });

    test('handles zero width', () => {
      expect(getAspectRatio(0, 100)).toBe(0);
    });
  });

  describe('getImageClasses', () => {
    test('returns aspect-video for wide images', () => {
      expect(getImageClasses(2)).toBe('aspect-video object-cover');
    });

    test('returns aspect-[3/4] for tall images', () => {
      expect(getImageClasses(0.5)).toBe('aspect-[3/4] object-cover');
    });

    test('returns aspect-square for square-ish images', () => {
      expect(getImageClasses(1)).toBe('aspect-square object-cover');
      expect(getImageClasses(1.2)).toBe('aspect-square object-cover');
      expect(getImageClasses(0.8)).toBe('aspect-square object-cover');
    });
  });

  describe('generateAvatarFallback', () => {
    test('generates SVG with initials for valid names', () => {
      const result = generateAvatarFallback('John', 'Doe');
      expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
      
      const decoded = atob(result.split(',')[1]);
      expect(decoded).toContain('JD');
    });

    test('handles empty first name', () => {
      const result = generateAvatarFallback('', 'Doe');
      const decoded = atob(result.split(',')[1]);
      expect(decoded).toContain('UD');
    });

    test('handles empty last name', () => {
      const result = generateAvatarFallback('John', '');
      const decoded = atob(result.split(',')[1]);
      expect(decoded).toContain('JN');
    });

    test('handles both names empty', () => {
      const result = generateAvatarFallback('', '');
      const decoded = atob(result.split(',')[1]);
      expect(decoded).toContain('UN');
    });

    test('handles null/undefined names', () => {
      const result = generateAvatarFallback(null as any, undefined as any);
      const decoded = atob(result.split(',')[1]);
      expect(decoded).toContain('UN');
    });

    test('converts to uppercase', () => {
      const result = generateAvatarFallback('john', 'doe');
      const decoded = atob(result.split(',')[1]);
      expect(decoded).toContain('JD');
    });
  });

  describe('isValidImageUrl', () => {
    test('returns true for valid HTTP URLs', () => {
      expect(isValidImageUrl('http://example.com/image.jpg')).toBe(true);
    });

    test('returns true for valid HTTPS URLs', () => {
      expect(isValidImageUrl('https://example.com/image.jpg')).toBe(true);
    });

    test('returns false for invalid URLs', () => {
      expect(isValidImageUrl('invalid-url')).toBe(false);
    });

    test('returns false for FTP URLs', () => {
      expect(isValidImageUrl('ftp://example.com/image.jpg')).toBe(false);
    });

    test('returns false for file URLs', () => {
      expect(isValidImageUrl('file:///path/to/image.jpg')).toBe(false);
    });

    test('returns false for empty string', () => {
      expect(isValidImageUrl('')).toBe(false);
    });

    test('returns false for null', () => {
      expect(isValidImageUrl(null as any)).toBe(false);
    });

    test('returns false for undefined', () => {
      expect(isValidImageUrl(undefined as any)).toBe(false);
    });

    test('returns false for non-string values', () => {
      expect(isValidImageUrl(123 as any)).toBe(false);
      expect(isValidImageUrl({} as any)).toBe(false);
      expect(isValidImageUrl([] as any)).toBe(false);
    });
  });
}); 