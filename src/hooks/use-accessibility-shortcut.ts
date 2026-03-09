import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Global keyboard shortcuts to open /accessibility:
 *   Windows: Ctrl + F12
 *   Mac:     Option + Command + 5
 */
export function useAccessibilityShortcut() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      // Ctrl + F12 (Windows/Linux)
      const isCtrlF12 = e.ctrlKey && !e.metaKey && e.key === 'F12';
      // Option(Alt) + Command(Meta) + 5 (Mac)
      const isOptionCmd5 = e.altKey && e.metaKey && e.key === '5';

      if (isCtrlF12 || isOptionCmd5) {
        e.preventDefault();
        if (location.pathname !== '/accessibility') {
          navigate('/accessibility');
        }
      }
    }

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate, location.pathname]);
}
