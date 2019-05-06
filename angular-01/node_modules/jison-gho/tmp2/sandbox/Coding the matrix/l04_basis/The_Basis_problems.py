# version code 80e56511a793+
# Please fill out this stencil and submit using the provided submission script.

import sys
import os
sys.path.insert(0, os.path.abspath('..\\matlib'))  # for compatibility with running from console

from GF2 import one
from math import sqrt, pi
from matutil import coldict2mat
from solver import solve
from vec import Vec
from vecutil import list2vec



## 1: (Problem 5.14.1) Span of Vectors over R, A
# For each part, please provide your solution as a list of the coefficients for
# the generators of V.
#
# For example, [1, 3, 5] would mean 1*[2,0,4,0] + 3*[0,1,0,1] + 5*[0,0,-1,-1]

rep_1 = [1, 1, 0]
rep_2 = [1/2, 1, 1]
rep_3 = [0, 1, -1]



## 2: (Problem 5.14.2) Span of Vectors over R, B
# For each part, please provide your solution as a list of the coefficients for
# the generators of V.

lin_comb_coefficients_1 = [2, -1, 1]
lin_comb_coefficients_2 = [...]
lin_comb_coefficients_3 = [...]
lin_comb_coefficients_4 = [...]



## 3: (Problem 5.14.3) Span of Vectors over GF2 A
# Use one from the GF2 module, not the integer 1.
# For each part, please provide your solution as a list of the coefficients for
# the generators of V.

gf2_rep_1 = [one, 0, one, 0]
gf2_rep_2 = [...]
gf2_rep_3 = [...]



## 4: (Problem 5.14.4) Span of Vectors over GF2 B
# Use one from the GF2 module, not the integer 1.
# For each part, please provide your solution as a list of the coefficients for
# the generators of V.

gf2_lc_rep_1 = [0, 0, 0, 0, one, one, 0, 0]  # sum(vi) = path, hence v5 + v6 - path from c to d
gf2_lc_rep_2 = [0, 0, 0, 0, 0, 0, one, one]
gf2_lc_rep_3 = [one, 0, 0, one, 0, 0, 0, 0]
gf2_lc_rep_4 = [0, 0, 0, one, 0, one, 0, 0]



## 5: (Problem 5.14.5) Linear Dependence over R A
# For each part, please provide your solution as a list of the coefficients for
# the generators of V.

lin_dep_R_1 = [...]
lin_dep_R_2 = [...]
lin_dep_R_3 = [...]



## 6: (Problem 5.14.6) Linear Dependence over R B
# Please record your solution as a list of coefficients

linear_dep_R_1 = [...]
linear_dep_R_2 = [...]
linear_dep_R_3 = [...]



## 7: (Problem 5.14.7) Superfluous vector
# Choose one of the vectors to express as a linear combination of the other two,
# and assign the name of that vector to sum_to (as a string)
# For each of the other two vectors, assign the coefficient to the corresponding variable.
# For example, if you want to say that w equals 2*u+3*v, you would
# assign 'w' to sum_to, assign 2 to u_coeff, and assign 3 to v_coeff.
# (In this case, it would not matter what was assigned to w_coeff.)
sum_to = 'v'
u_coeff = 1
v_coeff = 1
w_coeff = 1



## 8: (Problem 5.14.8) 4 linearly dependent vectors, every 3 are independent
# Please use the Vec class to represent your vectors

indep_vec_1 = Vec({0, 1, 2}, {0:1, 1:1, 2:0})
indep_vec_2 = Vec({0, 1, 2}, {0:0, 1:1, 2:1})
indep_vec_3 = Vec({0, 1, 2}, {0:1, 1:0, 2:1})
indep_vec_4 = Vec({0, 1, 2}, {0:1, 1:1, 2:1})



## 9: (Problem 5.14.9) Linear Dependence over GF(2) A
# For each subproblem, assign to the corresponding variable the list of
# coefficients (0 or one) for which the linear combination is zero.

zero_comb_1 = [...]
zero_comb_2 = [...]
zero_comb_3 = [...]



## 10: (Problem 5.14.10) Linear Dependence over GF(2) B
# In each subproblem, give your solution as a list of coefficients selected from {0, one}

# [coeff of v1, coeff of v2, coeff of v3, coeff of v4, coeff of v5]
sum_to_zero_1 = [0, one, 0, one, one]  # form a cycle => sum to 0

# [coeff of v1, coeff of v2, coeff of v3, coeff of v4, coeff of v5, coeff of v7, coeff of v8]
sum_to_zero_2 = [0, one, 0, one, one, 0, 0]  # subset is lineary dep => the initial combination is lineary dep

# [coeff of v1, coeff of v2, coeff of v3, coeff of v4, coeff of v6]
sum_to_zero_3 = [one, 0, one, one, one]

# [coeff of v1, coeff of v2, coeff of v3, coeff of v5, coeff of v6, coeff of v7, coeff of v8]
sum_to_zero_4 = [one, one, one, one, one, 0, 0]



## 11: (Problem 5.14.11) Exchange Lemma for Vectors over $\R$
## Please express your answer as a list of ints, such as [1,0,0,0,0]

exchange_1 = [0, 0, 1, 0, 0]
exchange_2 = [0, 0, 0, 1, 0]
exchange_3 = [0, 0, 1, 0, 0]



## 12: (Problem 5.14.12) Exchange Lemma for Vectors over GF(2)
# Please give the name of the vector you want to replace as a string (e.g. 'v1')

replace_1 = 'v3'  # ejecting v3 while injecting a new edge (GF(2)^N vector) leaves the previously nodes still connected
replace_2 = 'v1'
replace_3 = 'v4'



## 13: (Problem 5.14.13) rep2vec
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



## 14: (Problem 5.14.14) vec2rep
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
    A = coldict2mat(veclist)
    x = solve(A, v)
    res = (v - A*x)
    assert res*res<1e-14  # checking that the solution was found
    return x

## 15: (Problem 5.14.15) Superfluous Vector in Python
def is_superfluous(L, i):
    ''' True if vector L[i] can be ejected without changing the span.
    Input:
        - L: list of vectors as instances of Vec class
        - i: integer in range(len(L))
    Output:
        True if the span of the vectors of L is the same
        as the span of the vectors of L, excluding L[i].

        False otherwise.
    Examples:
    >>> D={'a','b','c','d'}
    >>> L = [Vec(D, {'a':1,'b':-1}), Vec(D, {'c':-1,'b':1}), Vec(D, {'c':1,'d':-1}), Vec(D, {'a':-1,'d':1}), Vec(D, {'b':1, 'c':1, 'd':-1})]
    >>> is_superfluous(L,4)
    False
    >>> is_superfluous(L,3)
    True
    >>> is_superfluous(L,2)
    True
    >>> L == [Vec(D,{'a':1,'b':-1}),Vec(D,{'c':-1,'b':1}),Vec(D,{'c':1,'d':-1}),Vec(D, {'a':-1,'d':1}),Vec(D,{'b':1, 'c':1, 'd':-1})]
    True
    >>> is_superfluous([Vec({0,1}, {})], 0)
    True
    >>> is_superfluous([Vec({0,1}, {0:1})], 0)
    False
    '''
    if len(L)>1:
        Lmat = coldict2mat(L[:i] + L[i+1:])
    elif L[0].f=={}:
        return True
    else:
        return False

    x = solve(Lmat, L[i])
    # print(Lmat)
    res = L[i]-Lmat*x
    if res*res>1e-14:
        return False
    return True



## 16: (Problem 5.14.16) is_independent in Python
def is_independent(L):
    '''
    Input:
        - L: a list of Vecs
    Output:
        - boolean: True if vectors in L are linearly independent
    Example:
        >>> vlist = [Vec({0, 1, 2},{0: 1}), Vec({0, 1, 2},{1: 1}), Vec({0, 1, 2},{2: 1}), Vec({0, 1, 2},{0: 1, 1: 1, 2: 1}), Vec({0, 1, 2},{1: 1, 2: 1}), Vec({0, 1, 2},{0: 1, 1: 1})]
        >>> is_independent(vlist)
        False
        >>> is_independent(vlist[:3])
        True
        >>> is_independent(vlist[:2])
        True
        >>> is_independent(vlist[1:4])
        True
        >>> is_independent(vlist[2:5])
        True
        >>> is_independent(vlist[2:6])
        False
        >>> is_independent(vlist[1:3])
        True
        >>> is_independent(vlist[5:])
        True
        >>> vlist == [Vec({0, 1, 2},{0: 1}), Vec({0, 1, 2},{1: 1}), Vec({0, 1, 2},{2: 1}), Vec({0, 1, 2},{0: 1, 1: 1, 2: 1}), Vec({0, 1, 2},{1: 1, 2: 1}), Vec({0, 1, 2},{0: 1, 1: 1})]
        True
    '''
    for i in range(len(L)):
        if is_superfluous(L, i):
            return False
    return True



## 17: (Problem 5.14.17) Subset Basis
def subset_basis(T):
    '''
    Input:
        - T: a list of Vecs
    Output: 
        - list S containing Vecs from T that is a basis for the space spanned by T.
    Examples:
        The following tests use the procedures is_superfluous and is_independent,
        written in previous problems.

        >>> a0 = Vec({'a','b','c','d'}, {'a':1})
        >>> a1 = Vec({'a','b','c','d'}, {'b':1})
        >>> a2 = Vec({'a','b','c','d'}, {'c':1})
        >>> a3 = Vec({'a','b','c','d'}, {'a':1,'c':3})
        >>> sb = subset_basis([a0, a1, a2, a3])
        >>> all(v in [a0, a1, a2, a3] for v in sb)
        True
        >>> is_independent(sb)
        True
        >>> all(is_superfluous([a]+sb, 0) for a in [a0, a1, a2, a3])
        True

        >>> b0 = Vec({0,1,2,3},{0:2,1:2,3:4})
        >>> b1 = Vec({0,1,2,3},{0:1,1:1})
        >>> b2 = Vec({0,1,2,3},{2:3,3:4})
        >>> b3 = Vec({0,1,2,3},{3:3})
        >>> sb = subset_basis([b0, b1, b2, b3])
        >>> all(v in [b0, b1, b2, b3] for v in sb)
        True
        >>> is_independent(sb)
        True
        >>> all(is_superfluous([b]+sb, 0) for b in [b0, b1, b2, b3])
        True
    '''
    # Shrink algorithm
    S = list(T)
    for i, v in enumerate(S):
        if is_superfluous(S, i):
            del S[i]
    return S

    # Grow algorithm
    # S = []
    # n = 0
    # for v in T:
    #     S.append(v)
    #     if is_independent(S):
    #         n = n+1
    #         continue
    #     del S[n]
    # return S






## 18: (Problem 5.14.18) Superset Basis Lemma in Python
def superset_basis(T, L):
    '''
    Input:
        - T: linearly independent list of Vecs
        - L: list of Vecs such that every Vec in T is in Span(L)
    Output:
        Linearly independent list S containing all Vecs in T
        such that the span of S is the span of L (i.e. S is a basis for the span
        of L).
    Example:
        >>> a0 = Vec({'a','b','c','d'}, {'a':1})
        >>> a1 = Vec({'a','b','c','d'}, {'b':1})
        >>> a2 = Vec({'a','b','c','d'}, {'c':1})
        >>> a3 = Vec({'a','b','c','d'}, {'a':1,'c':3})
        >>> sb = superset_basis([a0, a3], [a0, a1, a2])
        >>> a0 in sb and a3 in sb
        True
        >>> is_independent(sb)
        True
        >>> all(x in [a0,a1,a2,a3] for x in sb)
        True
        >>> all((not is_independent(sb+[x])) for x in [a0, a1, a2])
        True
    '''
    # Grow algorithm
    S = T
    n = len(T)
    for v in L:
        S.append(v)
        if is_independent(S):
            n = n+1
            continue
        del S[n]
    return S




## 19: (Problem 5.14.19) Exchange Lemma in Python
def exchange(S, A, z):
    '''
    Input:
        - S: a list of vectors, as instances of your Vec class
        - A: a list of vectors, each of which are in S, with len(A) < len(S)
        - z: an instance of Vec such that A+[z] is linearly independent
    Output: a vector w in S but not in A such that Span S = Span ({z} U S - {w})
    Example:
        >>> S = [list2vec(v) for v in [[0,0,5,3],[2,0,1,3],[0,0,1,0],[1,2,3,4]]]
        >>> A = [list2vec(v) for v in [[0,0,5,3],[2,0,1,3]]]
        >>> z = list2vec([0,2,1,1])
        >>> exchange(S, A, z) == Vec({0, 1, 2, 3},{0: 0, 1: 0, 2: 1, 3: 0})
        True
    '''
    coeffs = vec2rep(S, z)  # vector of coefficients in linear combination of s_i vectors: S*coeffs = z
    for i,c in enumerate(coeffs.f.values()):
        if S[i] in A:  # not in protected set
            continue
        elif c!=0:  # there exists a non-zero coefficients outside of A
            break
    return S[i]  # return the vector, corresponding to a non-zero coef
