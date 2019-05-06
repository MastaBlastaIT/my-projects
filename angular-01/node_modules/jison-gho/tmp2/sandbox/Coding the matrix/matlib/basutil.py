""" Util functions for working with basis """

from matutil import coldict2mat
from solver import solve

def rep2vec(u, veclist):
    '''
    Input:
        - u: a Vec whose domain is set(range(len(veclist)))
        - veclist: a list of Vecs
    Output:
        the Vec whose coordinate representation is u
        (i.e u[0] is the coefficient of veclist[0], u[1] is the coefficient of veclist[1], etc.)
    Example:
        >>> v0 = Vec({'a','b','c','d'}, {'a':1})
        >>> v1 = Vec({'a','b','c','d'}, {'a':1, 'b':2})
        >>> v2 = Vec({'a','b','c','d'}, {'c':4, 'd':8})
        >>> rep2vec(Vec({0,1,2}, {0:2, 1:4, 2:6}), [v0,v1,v2]) == Vec({'d', 'a', 'c', 'b'},{'a': 6, 'c': 24, 'b': 8, 'd': 48})
        True
        >>> rep2vec(Vec({0,1,2}, {0:2, 1:4}), [v0, v1, v2]) == Vec({'d', 'a', 'c', 'b'},{'a': 6, 'c': 0, 'b': 8, 'd': 0})
        True
    '''
    return coldict2mat(veclist)*u



def vec2rep(veclist, v):
    '''
    Input:
        - veclist: a list of Vecs
        - v: a Vec in the span of set(veclist)
    Output:
        the Vec u whose domain is set(range(len(veclist))) that is the coordinate representation of v with respect to veclist
    Example:
        >>> v0 = Vec({'a','b','c','d'}, {'a':2})
        >>> v1 = Vec({'a','b','c','d'}, {'a': 16, 'b':4})
        >>> v2 = Vec({'a','b','c','d'}, {'c':8})
        >>> v = Vec({'d', 'a', 'c', 'b'},{'a': -1, 'c': 10, 'b': -1})
        >>> vec2rep([v0,v1,v2], v)  == Vec({0, 1, 2},{0: 1.5, 1: -0.25, 2: 1.25})
        True
    '''
    x = solve(coldict2mat(veclist), v)
    return x