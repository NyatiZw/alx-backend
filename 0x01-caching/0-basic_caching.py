#!/usr/bin/env python3
"""This is the BasicCache module"""


from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """A caching system that doesn't have a limit"""

    def put(self, key, item):
        """
        Store an item in the cache

        Args:
            key: The key for the item
            item: The item to be stored

        if key or item is None, this module does nothing
        """
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """
        Retrieve an item from the cache.

        Args:
            key: The key for the item to be retrieved.

        Returns:
            The item linked to the given key, or None
        """
        if key is not None:
            return self.cache_data.get(key)
        return None
