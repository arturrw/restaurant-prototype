import { useGoTo } from './useGoTo.js';

// Used by any "go home" logo/wordmark link, wherever it appears.
export function useGoHome() {
  const goTo = useGoTo();
  return () => goTo('/');
}
