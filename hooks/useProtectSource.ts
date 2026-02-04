
import { useEffect } from 'react';
import { Platform } from 'react-native';

export function useProtectSource() {
    useEffect(() => {
        if (Platform.OS === 'web') {
            const handleContextMenu = (e: Event) => {
                e.preventDefault();
            };

            const handleKeyDown = (e: KeyboardEvent) => {
                // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
                if (
                    e.key === 'F12' ||
                    (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                    (e.ctrlKey && e.shiftKey && e.key === 'J') ||
                    (e.ctrlKey && e.key === 'U') ||
                    (e.metaKey && e.altKey && e.key === 'i') || // Mac: Cmd+Option+I
                    (e.metaKey && e.altKey && e.key === 'j') || // Mac: Cmd+Option+J
                    (e.metaKey && e.key === 'u') // Mac: Cmd+U
                ) {
                    e.preventDefault();
                }
            };

            document.addEventListener('contextmenu', handleContextMenu);
            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.removeEventListener('contextmenu', handleContextMenu);
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, []);
}
