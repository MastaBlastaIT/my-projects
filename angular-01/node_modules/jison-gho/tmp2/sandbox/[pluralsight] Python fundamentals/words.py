#!/usr/bin/env python
""" Retrieve and prints words from a URL.

Usage:

    python words.py <URL>
"""

import sys
from urllib.request import urlopen
# from urllib import urlopen  # Python2 version


def fetch_words(url):
    """Fetch a list of words from a URL.

    Args:
        url: The URL of a UTF-8 text document.

    Returns:
        A list of strings containing the words from the document.

    """
    # Python2 version:
    # story = urlopen('http://sixty-north.com/c/t.txt').read()
    # for line in story.split('\n'):
    #   line_words = line.split()

    with urlopen('http://sixty-north.com/c/t.txt') as story:
        story_words = []
        for line in story:
            line_words = line.decode('utf-8').split()
            for word in line_words:
                story_words.append(word)
    return story_words


def print_items(items):
    """Print items one per line.

    Args:
        items: An iterable series of printable items.
    """
    for item in items:
        print(item)


def main(url="http://sixty-north.com/c/t.txt"):
    """Print each word from a text document from a URL.

    Args:
        url: The URL of a UTF-8 text document.
    """
    words = fetch_words(url)
    print_items(words)

if __name__ == "__main__":
    main(sys.argv[1])  # The 0th arg is the module filename
