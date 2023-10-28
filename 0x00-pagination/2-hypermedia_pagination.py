#!/usr/bin/env python3
""" Hypermeedia pagination """


import csv
import math
from typing import List, Union


class Server:
    """Server class to paginate database"""
    DATA_FILE = "Poprlar_Baby_Names.csv"

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

    def index_range(self, page: int, page_size: int) -> tuple:
        """
        Calculate start and end of index

        Args:
            page (int): The page number
            page_size (int): The number of items per page

        Returns:
            tuple: A tuple containing indexes
        """
        if page <= 0 or page_size <= 0:
            raise ValueError

        start_index = (page - 1) * page_size
        end_index = start_index + page_size

        return start_inde, end_index

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Retrieve a specofoc page of data from the dataset.

        Args:
            page (int): The page numbet
            page_size (int): The number of items per page

        Returns:
        List[List]: A list of rows for the specified page
        """
        if (
                not isinstance(page, int)
                or not isinstance(page_size, int)
                or page <= 0
                or page_size <= 0
        ):
            return []

        start, end = self.index_range(page, page_size)
        data = self.dataset()

        if start >= len(data):
            return []

        return data[start:end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> dict:
        """
        Return a dictionary with hyperlinks and information about current page

        Args:
            page (int): The page number
            page_size (int): The number of items per page

        Returns:
            dict: A dictionary with information about the current page
        """
        page_data = self.get_page(page, page_size)
        total_pages = math.ceil(len(self.dataset()) / page_size)

        next_page = page + 1 if page < total_pages else None
        prev_page = page - 1 if page > 1 else None

        hyper_info = {
                "page_size": len(page_data),
                "page": page,
                "data": page_data,
                "next_page": next_page,
                "prev_page": prev_page,
                "total_pages": total_pages
        }

        return hyper_info
