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

export const useImageLoader = (src: string): UseImageLoaderReturn => {
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
    
    const handleLoad = async () => {
      try {
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
      setHasError(true);
      setIsLoading(false);
      setImageSrc(null);
      setImageClasses('aspect-square object-cover');
      setDimensions(null);
      setAspectRatio(null);
    };

    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return {
    isLoading,
    hasError,
    imageSrc,
    imageClasses,
    dimensions,
    aspectRatio
  };
}; 