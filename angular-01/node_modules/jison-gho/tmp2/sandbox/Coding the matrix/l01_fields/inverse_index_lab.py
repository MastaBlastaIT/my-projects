# version code 80e56511a793+
# Please fill out this stencil and submit using the provided submission script.


from random import randint
from itertools import chain

STORIES = ['stories_small.txt', 'stories_big.txt']


## 1: (Task 0.6.2) Movie Review
## Task 1
def movie_review(name):
    """
    Input: the name of a movie
    Output: a string (one of the review options), selected at random using randint
    """
    return ["Wow!", "Brilliant!", "A gem", "The best", "Good"][randint(1, 5)-1]


## 2: (Task 0.6.6) Make Inverse Index
def makeInverseIndex(strlist):
    """
    Input: a list of documents as strings
    Output: a dictionary that maps each word in any document to the set consisting of the
            document ids (ie, the index in the strlist) for all documents containing the word.
    Distinguish between an occurence of a string (e.g. "use") in the document as a word
    (surrounded by spaces), and an occurence of the string as a substring of a word (e.g. "because").
    Only the former should be represented in the inverse index.
    Feel free to use a loop instead of a comprehension.

    Example:
    >>> makeInverseIndex(['hello world','hello','hello cat','hellolot of cats']) == {'hello': {0, 1, 2}, 'cat': {2}, 'of': {3}, 'world': {0}, 'cats': {3}, 'hellolot': {3}}
    True
    """
    res = {}
    for i, str in enumerate(strlist):
        # upd_dict = {word: {i} for word in str.split() if word not in res}  # new keys to index
        # res.update(upd_dict)
        res.update({word: {i}.union(res[word] if word in res else set())  # add {i} to existing set, or empty set
                    for word in str.split()})
        # for word in str.split():
        #     if word in res:
        #         res[word].add(i)
        #     else:
        #         res[word] = {i}

    return res


## 3: (Task 0.6.7) Or Search
def orSearch(inverseIndex, query):
    """
    Input: an inverse index, as created by makeInverseIndex, and a list of words to query
    Output: the set of document ids that contain _any_ of the specified words
    Feel free to use a loop instead of a comprehension.
    
    >>> idx = makeInverseIndex(['Johann Sebastian Bach', 'Johannes Brahms', 'Johann Strauss the Younger', 'Johann Strauss the Elder', ' Johann Christian Bach',  'Carl Philipp Emanuel Bach'])
    >>> orSearch(idx, ['Bach','the'])
    {0, 2, 3, 4, 5}
    >>> orSearch(idx, ['Johann', 'Carl'])
    {0, 2, 3, 4, 5}
    >>> orSearch(idx, ['Johann', 'Bach', 'Sebastian'])
    {0, 2, 3, 4, 5}
    >>> idx == makeInverseIndex(['Johann Sebastian Bach', 'Johannes Brahms', 'Johann Strauss the Younger', 'Johann Strauss the Elder', ' Johann Christian Bach',  'Carl Philipp Emanuel Bach'])
    True
    """
    # res = set()
    # for word in query:
    #     res.add(inverseIndex[word])
    # return res
    return set(chain.from_iterable(inverseIndex[word] for word in query))


## 4: (Task 0.6.8) And Search
def andSearch(inverseIndex, query):
    """
    Input: an inverse index, as created by makeInverseIndex, and a list of words to query
    Output: the set of all document ids that contain _all_ of the specified words
    Feel free to use a loop instead of a comprehension.

    >>> idx = makeInverseIndex(['Johann Sebastian Bach', 'Johannes Brahms', 'Johann Strauss the Younger', 'Johann Strauss the Elder', ' Johann Christian Bach',  'Carl Philipp Emanuel Bach'])
    >>> andSearch(idx, ['Johann', 'the'])
    {2, 3}
    >>> andSearch(idx, ['Johann', 'Bach'])
    {0, 4}
    >>> andSearch(idx, ['Johann', 'Bach', 'Sebastian'])
    {0}
    >>> idx == makeInverseIndex(['Johann Sebastian Bach', 'Johannes Brahms', 'Johann Strauss the Younger', 'Johann Strauss the Elder', ' Johann Christian Bach',  'Carl Philipp Emanuel Bach'])
    True
    """

    res = {k if all(k in inverseIndex[word] for word in query) else None
           for k in chain.from_iterable(inverseIndex[word] for word in query)
           # document ids containing the words based on index
           }
    res.discard(None)
    return res


def main():
    print("Enter list of words separated with spaces as search query: ")
    input_str = input()
    query = input_str.split()

    print("Choose file to search: 1 - stories_small.txt, 2 - stories_big.txt")
    story_id = int(input())-1
    stories = list(open(STORIES[story_id]))
    print("Searching through {}...".format(STORIES[story_id]))

    idx = makeInverseIndex(stories)
    print("orSearch results:", orSearch(idx, query))
    print("andSearch results:", andSearch(idx, query))


if __name__ == "__main__":
    main()
