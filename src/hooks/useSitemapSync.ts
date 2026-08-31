import { useEffect, useState, useCallback } from 'react';

export function useSitemapSync(items: any[], onChangeCallback?: (statusText: string) => void) {
  const [lastSynced, setLastSynced] = useState<string>(new Date().toISOString());
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced'>('idle');

  const triggerSync = useCallback(async () => {
    setSyncStatus('syncing');
    try {
      // Simulate real-time sitemap synchronization with database/server
      await new Promise(r => setTimeout(r, 500));
      setLastSynced(new Date().toISOString());
      setSyncStatus('synced');
      if (onChangeCallback) {
        onChangeCallback(`Sitemap automatically synchronized: ${items.length} records processed.`);
      }
    } catch (err) {
      setSyncStatus('idle');
    }
  }, [items.length, onChangeCallback]);

  useEffect(() => {
    triggerSync();
  }, [items.length, triggerSync]);

  return { lastSynced, syncStatus, triggerSync };
}
