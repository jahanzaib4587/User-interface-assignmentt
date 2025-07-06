/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';
import { useModal } from '../../hooks/useModal';

describe('useModal', () => {
  beforeEach(() => {
    // Reset document.body.style.overflow
    document.body.style.overflow = '';
    
    // Mock event listeners
    document.addEventListener = jest.fn();
    document.removeEventListener = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('initializes with closed state', () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.selectedUserId).toBe(null);
  });

  test('opens modal with user ID', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal(123);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.selectedUserId).toBe(123);
    expect(document.body.style.overflow).toBe('hidden');
  });

  test('closes modal', () => {
    const { result } = renderHook(() => useModal());

    // First open the modal
    act(() => {
      result.current.openModal(123);
    });

    expect(result.current.isOpen).toBe(true);

    // Then close it
    act(() => {
      result.current.closeModal();
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.selectedUserId).toBe(null);
    expect(document.body.style.overflow).toBe('unset');
  });

  test('adds escape key event listener when modal opens', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal(123);
    });

    expect(document.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  test('removes escape key event listener when modal closes', () => {
    const { result } = renderHook(() => useModal());

    // Open modal
    act(() => {
      result.current.openModal(123);
    });

    // Clear mocks to see calls from closing
    jest.clearAllMocks();

    // Close modal
    act(() => {
      result.current.closeModal();
    });

    expect(document.removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  test('handles escape key press to close modal', () => {
    const { result } = renderHook(() => useModal());
    let escapeHandler: (event: KeyboardEvent) => void;

    // Mock addEventListener to capture the handler
    (document.addEventListener as jest.Mock).mockImplementation((event, handler) => {
      if (event === 'keydown') {
        escapeHandler = handler;
      }
    });

    act(() => {
      result.current.openModal(123);
    });

    expect(result.current.isOpen).toBe(true);

    // Simulate escape key press
    act(() => {
      escapeHandler({ key: 'Escape' } as KeyboardEvent);
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.selectedUserId).toBe(null);
  });

  test('ignores non-escape key presses', () => {
    const { result } = renderHook(() => useModal());
    let escapeHandler: (event: KeyboardEvent) => void;

    (document.addEventListener as jest.Mock).mockImplementation((event, handler) => {
      if (event === 'keydown') {
        escapeHandler = handler;
      }
    });

    act(() => {
      result.current.openModal(123);
    });

    expect(result.current.isOpen).toBe(true);

    // Simulate other key press
    act(() => {
      escapeHandler({ key: 'Enter' } as KeyboardEvent);
    });

    // Modal should still be open
    expect(result.current.isOpen).toBe(true);
    expect(result.current.selectedUserId).toBe(123);
  });

  test('cleans up body overflow on unmount', () => {
    const { unmount } = renderHook(() => useModal());

    unmount();

    expect(document.body.style.overflow).toBe('unset');
  });

  test('handles multiple rapid open/close operations', () => {
    const { result } = renderHook(() => useModal());

    // Rapid open/close operations
    act(() => {
      result.current.openModal(1);
      result.current.closeModal();
      result.current.openModal(2);
      result.current.closeModal();
      result.current.openModal(3);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.selectedUserId).toBe(3);
    expect(document.body.style.overflow).toBe('hidden');
  });

  test('openModal function is stable across rerenders', () => {
    const { result, rerender } = renderHook(() => useModal());

    const firstOpenModal = result.current.openModal;
    
    rerender();
    
    const secondOpenModal = result.current.openModal;

    expect(firstOpenModal).toBe(secondOpenModal);
  });

  test('closeModal function is stable across rerenders', () => {
    const { result, rerender } = renderHook(() => useModal());

    const firstCloseModal = result.current.closeModal;
    
    rerender();
    
    const secondCloseModal = result.current.closeModal;

    expect(firstCloseModal).toBe(secondCloseModal);
  });

  test('handles invalid user IDs gracefully', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal(0);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.selectedUserId).toBe(0);

    act(() => {
      result.current.openModal(-1);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.selectedUserId).toBe(-1);
  });

  test('overwrites previous user ID when opening new modal', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal(123);
    });

    expect(result.current.selectedUserId).toBe(123);

    act(() => {
      result.current.openModal(456);
    });

    expect(result.current.selectedUserId).toBe(456);
    expect(result.current.isOpen).toBe(true);
  });
}); 