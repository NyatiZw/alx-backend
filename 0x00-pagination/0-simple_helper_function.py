#!/usr/bin/env python3
""" Simple helper function"""


def index_range(page: int, page_size: int) -> tuple:
    """
    Calculate the start and end indexes

    Agrs:
        page (int): The page number
        page_size (int): The number of items per page.

    Returns:
        tuple: A tuple containing the start and end indexes
    """
    if page <= 0 or page_size <= 0:
        raise ValueError

    start_index = (page - 1) * page_size
    end_index = start_index + page_size

    return start_index, end_index
