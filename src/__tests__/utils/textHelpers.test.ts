import { truncateText, truncateByWords, truncateEmail, truncateLocation } from '../../utils/textHelpers';

describe('textHelpers', () => {
  describe('truncateText', () => {
    it('should return empty string for null/undefined text', () => {
      expect(truncateText(null, 10)).toBe('');
      expect(truncateText(undefined, 10)).toBe('');
    });

    it('should return original text if shorter than max length', () => {
      expect(truncateText('Hello', 10)).toBe('Hello');
    });

    it('should truncate text and add ellipsis if longer than max length', () => {
      expect(truncateText('Hello World', 5)).toBe('Hello...');
    });

    it('should handle empty string', () => {
      expect(truncateText('', 10)).toBe('');
    });

    it('should trim whitespace before adding ellipsis', () => {
      expect(truncateText('Hello   ', 5)).toBe('Hello...');
    });

    it('should handle exact max length', () => {
      expect(truncateText('Hello', 5)).toBe('Hello');
    });
  });

  describe('truncateByWords', () => {
    it('should return empty string for null/undefined text', () => {
      expect(truncateByWords(null, 3)).toBe('');
      expect(truncateByWords(undefined, 3)).toBe('');
    });

    it('should return original text if word count is within limit', () => {
      expect(truncateByWords('Hello World', 3)).toBe('Hello World');
    });

    it('should truncate by words and add ellipsis', () => {
      expect(truncateByWords('Hello World From React', 2)).toBe('Hello World...');
    });

    it('should handle single word', () => {
      expect(truncateByWords('Hello', 1)).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(truncateByWords('', 3)).toBe('');
    });

    it('should handle exact word count', () => {
      expect(truncateByWords('Hello World', 2)).toBe('Hello World');
    });
  });

  describe('truncateEmail', () => {
    it('should return empty string for null/undefined email', () => {
      expect(truncateEmail(null, 20)).toBe('');
      expect(truncateEmail(undefined, 20)).toBe('');
    });

    it('should return original email if shorter than max length', () => {
      expect(truncateEmail('test@example.com', 20)).toBe('test@example.com');
    });

    it('should truncate username while preserving domain', () => {
      expect(truncateEmail('verylongusername@example.com', 25)).toBe('verylongus...@example.com');
    });

    it('should truncate whole email if domain is too long', () => {
      expect(truncateEmail('user@verylongdomainname.com', 10)).toBe('user@veryl...');
    });

    it('should handle email without @ symbol', () => {
      expect(truncateEmail('notanemail', 5)).toBe('notan...');
    });

    it('should handle empty string', () => {
      expect(truncateEmail('', 10)).toBe('');
    });

    it('should handle exact max length', () => {
      expect(truncateEmail('test@example.com', 16)).toBe('test@example.com');
    });

    it('should handle very short max length', () => {
      expect(truncateEmail('test@example.com', 5)).toBe('test@...');
    });

    it('should fall back to regular truncation when domain is too long', () => {
      expect(truncateEmail('verylongusername@example.com', 15)).toBe('verylongusernam...');
    });
  });

  describe('truncateLocation', () => {
    it('should return empty string for null/undefined location', () => {
      expect(truncateLocation(null, 20)).toBe('');
      expect(truncateLocation(undefined, 20)).toBe('');
    });

    it('should return original location if shorter than max length', () => {
      expect(truncateLocation('New York, NY, USA', 30)).toBe('New York, NY, USA');
    });

    it('should truncate location intelligently', () => {
      expect(truncateLocation('New York, New York, United States', 15)).toBe('New York...');
    });

    it('should handle single part location', () => {
      expect(truncateLocation('New York', 5)).toBe('New Y...');
    });

    it('should handle empty string', () => {
      expect(truncateLocation('', 10)).toBe('');
    });

    it('should prioritize city over other parts', () => {
      expect(truncateLocation('San Francisco, California, USA', 20)).toBe('San Francisco...');
    });

    it('should handle exact max length', () => {
      expect(truncateLocation('New York, NY, USA', 17)).toBe('New York, NY, USA');
    });

    it('should handle multiple comma-separated parts', () => {
      expect(truncateLocation('Los Angeles, California, United States of America', 25)).toBe('Los Angeles, California...');
    });

    it('should handle location with extra spaces', () => {
      expect(truncateLocation('New York , NY , USA', 25)).toBe('New York , NY , USA');
    });
  });
}); 