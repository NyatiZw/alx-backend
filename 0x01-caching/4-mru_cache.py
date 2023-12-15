#!/usr/bin/env python3

from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """A caching system that uses the Most Recently Used (MRU) algorithm"""

    def __init__(self):
        """Initialize the MRUCache instance"""
        super().__init__()
        self.order = []  # Maintain order of keys based on access time

    def put(self, key, item):
        """
        Store an item in the cache using the MRU algorithm

        Args:
            key: The key for the item
            item: The item to be stored

        If key or item is None, this method does nothing.
        If the number of items exceeds BaseCaching.MAX_ITEMS,
        discard the most recently used item (MRU).
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                # Find and discard the most recently used item (MRU)
                mru_key = self.order.pop()
                del self.cache_data[mru_key]
                print(f"DISCARD: {mru_key}\n")

            # Assign the item value for the key
            self.cache_data[key] = item
            # Update order to track access time
            self.order.append(key)

    def get(self, key):
        """
        Retrieve an item from the cache.

        Args:
            key: The key for the item to be retrieved.

        Returns:
            The item linked to the given key, or None
        """
        if key is not None:
            # Update order to track access time
            if key in self.order:
                self.order.remove(key)
            self.order.append(key)

            return self.cache_data.get(key)
        return None
