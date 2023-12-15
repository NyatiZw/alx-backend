#!/usr/bin/env python3

"""LIFOCache that inherits from BaseCaching"""

from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """A caching system that uses the Last-In-First-Out (LIFO) algorithm"""

    def __init__(self):
        """Initialize the LIFOCache instance"""
        super().__init__()

    def put(self, key, item):
        """
        Store an item in the cache using the LIFO algorithm

        Args:
            key: The key for the item
            item: The item to be stored

        If key or item is None, this method does nothing.
        If the number of items exceeds BaseCaching.MAX_ITEMS,
        discard the last item (LIFO).
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                # Find and discard the last item (LIFO)
                discarded_key = list(self.cache_data.keys())[-1]
                del self.cache_data[discarded_key]
                print(f"DISCARD: {discarded_key}\n")

            # Assign the item value for the key
            self.cache_data[key] = item

    def get(self, key):
        """
        Retrieve an item from the cache.

        Args:
            key: The key for the item to be retrieved.

        Returns:
            The item linked to the given key, or None.
        """
        if key is not None:
            return self.cache_data.get(key)
        return None
