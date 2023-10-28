#!/usr/bin/env python3
""" Simple pagination """


import csv
import math
from typing import List


class Server:
    """ Server class to paginate a database """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset"""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Retrieve a specific page of data from dataset.

        Args:
            Page (int): The page number
            page_size (int): The number of items per page

        Returns:
            List[List]: A list of rows for the specific page
        """
        if (
                not isinstance(page, int)
                or not isinstance(page_size, int)
                or page <= 0
                or page_size <= 0
        ):
            return []

        start, end = index_range(page, page_size)
        data = self.dataset()

        if start >= len(data):
            return []

        return data[start:end]
