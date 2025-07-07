import { useState, useEffect } from 'react';
import { getImageDimensions, getAspectRatio, getImageClasses } from '../utils/imageHelpers';

interface UseImageLoaderReturn {
  isLoading: boolean;
  hasError: boolean;
  imageSrc: string | null;
  imageClasses: string;
  dimensions: { width: number; height: number } | null;
  aspectRatio: number | null;
}

export const useImageLoader = (src: string, timeout: number = 10000): UseImageLoaderReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageClasses, setImageClasses] = useState('aspect-square object-cover');
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      setHasError(false);
      setImageSrc(null);
      setImageClasses('aspect-square object-cover');
      setDimensions(null);
      setAspectRatio(null);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    const img = new Image();
    let timeoutId: NodeJS.Timeout;
    
    const handleLoad = async () => {
      try {
        // Clear timeout since image loaded successfully
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        
        // Get image dimensions
        const imageDimensions = await getImageDimensions(src);
        const ratio = getAspectRatio(imageDimensions.width, imageDimensions.height);
        const classes = getImageClasses(ratio);
        
        setImageSrc(src);
        setDimensions(imageDimensions);
        setAspectRatio(ratio);
        setImageClasses(classes);
        setIsLoading(false);
      } catch (error) {
        setHasError(true);
        setIsLoading(false);
        setImageSrc(null);
        setImageClasses('aspect-square object-cover');
        setDimensions(null);
        setAspectRatio(null);
      }
    };

    const handleError = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setHasError(true);
      setIsLoading(false);
      setImageSrc(null);
      setImageClasses('aspect-square object-cover');
      setDimensions(null);
      setAspectRatio(null);
    };

    const handleTimeout = () => {
      console.warn(`Image loading timeout after ${timeout}ms for: ${src}`);
      setHasError(true);
      setIsLoading(false);
      setImageSrc(null);
      setImageClasses('aspect-square object-cover');
      setDimensions(null);
      setAspectRatio(null);
    };

    // Set up timeout
    timeoutId = setTimeout(handleTimeout, timeout);

    img.onload = handleLoad;
    img.onerror = handleError;
    
    // Add crossOrigin attribute to handle CORS issues
    img.crossOrigin = 'anonymous';
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [src, timeout]);

  return {
    isLoading,
    hasError,
    imageSrc,
    imageClasses,
    dimensions,
    aspectRatio
  };
}; 