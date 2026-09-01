/**
 * Storage Manager - handles debounced localStorage operations
 * Prevents excessive sync writes by batching updates
 */

import { debounce } from './debounce';

interface StorageItem {
  key: string;
  value: any;
  expiresAt?: number;
}

class StorageManager {
  private pendingWrites: Map<string, any> = new Map();
  private debouncedWrite = debounce(() => this.flushWrites(), 1000);

  /**
   * Queue a write operation (debounced)
   */
  setAsync(key: string, value: any, expiresInMs?: number): void {
    const item: StorageItem = { key, value };
    if (expiresInMs) {
      item.expiresAt = Date.now() + expiresInMs;
    }

    this.pendingWrites.set(key, item);
    this.debouncedWrite();
  }

  /**
   * Flush all pending writes to localStorage synchronously
   */
  private flushWrites(): void {
    try {
      for (const [key, item] of this.pendingWrites.entries()) {
        const data = JSON.stringify(item);
        localStorage.setItem(key, data);
      }
      this.pendingWrites.clear();
    } catch (error) {
      console.error('StorageManager: Failed to flush writes', error);
    }
  }

  /**
   * Get value with expiration checking
   */
  getAsync(key: string): any {
    try {
      const data = localStorage.getItem(key);
      if (!data) return null;

      const item: StorageItem = JSON.parse(data);

      // Check expiration
      if (item.expiresAt && item.expiresAt < Date.now()) {
        localStorage.removeItem(key);
        return null;
      }

      return item.value;
    } catch (error) {
      console.error('StorageManager: Failed to read', error);
      return null;
    }
  }

  /**
   * Remove item
   */
  removeAsync(key: string): void {
    this.pendingWrites.delete(key);
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('StorageManager: Failed to remove', error);
    }
  }

  /**
   * Clear all (force sync)
   */
  clearAll(): void {
    this.pendingWrites.clear();
    try {
      localStorage.clear();
    } catch (error) {
      console.error('StorageManager: Failed to clear', error);
    }
  }

  /**
   * Force flush (useful for critical operations before page unload)
   */
  flush(): void {
    this.flushWrites();
  }
}

export const storageManager = new StorageManager();
