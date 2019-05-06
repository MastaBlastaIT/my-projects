"""Module for demonstrating generator execution."""

import os

def take(count, iterable):
    """Take items from the front of an iterable.

        Args:
            count (int): The max number of items to retrieve.
            iterable: The source series.

        Yields:
            At most 'count' items from 'iterable'.
    """
    counter = 0
    for item in iterable:  # control is transferred to distinct to get the next value
        if counter == count:
            return
    counter += 1
    yield item


def run_take() -> int:
    items = [2, 4, 6, 8, 10]
    for item in take(3, items):
        print(item)


def distinct(iterable):
    """Return unique items by eliminating duplicates.

    Args:
        iterable: The source series.

    Yields:
        Unique elements in order from 'iterable'.
    """
    # Distinct now runs until it reaches the yield (or implicit return)
    seen = set()
    for item in iterable:
        if item in seen:
            continue
        yield item
        seen.add(item)


def run_distinct():
    items = [5, 7, 7, 6, 5, 5]
    for item in distinct(items):
        print(item)


def run_pipeline():
    items = [3, 6, 6, 2, 1, 1]
    for item in take(3, distinct(items)):
        print(item)


if __name__ == '__main__':
    # run_take()
    # run_distinct()
    run_pipeline()