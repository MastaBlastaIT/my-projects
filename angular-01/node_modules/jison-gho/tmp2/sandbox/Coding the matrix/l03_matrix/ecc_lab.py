# version code 80e56511a793+
# Please fill out this stencil and submit using the provided submission script.

import sys
sys.path.append('..\\matlib')  # for compatibility with running from console
from vec import Vec
from mat import Mat
from bitutil import bits2mat, str2bits, bits2str, mat2bits, noise
from GF2 import one
from matutil import listlist2mat
from mat import transpose

## Task 1
""" Create an instance of Mat representing the generator matrix G. You can use
the procedure listlist2mat in the matutil module (be sure to import first).
Since we are working over GF (2), you should use the value one from the
GF2 module to represent 1"""
G = transpose(listlist2mat([[one, one, 0, one, 0, 0, one],
                            [0, one, 0, one, 0, one, 0],
                            [one, 0, 0, one, one, 0, 0],
                            [one, one, one, 0, 0, 0, 0]]))

## Task 2
# Please write your answer as a list. Use one from GF2 and 0 as the elements.
encoding_1001 = [0, 0, one, one, 0, 0, one]


## Task 3
# Express your answer as an instance of the Mat class.
R = listlist2mat([[0, 0, 0, 0, 0, 0, one],
                  [0, 0, 0, 0, 0, one, 0],
                  [0, 0, 0, 0, one, 0, 0],
                  [0, 0, one, 0, 0, 0, 0]])  # Rc = p: G(p) = c => R - inverse for G

print(R*G)  # identity matrix

## Task 4
# Create an instance of Mat representing the check matrix H.
H = listlist2mat([[0, 0, 0, one, one, one, one],
                  [0, one, one, 0, 0, one, one],
                  [one, 0, one, 0, one, 0, one]])
print(H*G)  # zero matrix

## Task 5
def find_error(syndrome):
    """
    Input: an error syndrome as an instance of Vec
    Output: the corresponding error vector e
    Examples:
        >>> find_error(Vec({0,1,2}, {0:one})) == Vec({0, 1, 2, 3, 4, 5, 6},{3: one})
        True
        >>> find_error(Vec({0,1,2}, {2:one})) == Vec({0, 1, 2, 3, 4, 5, 6},{0: one})
        True
        >>> find_error(Vec({0,1,2}, {1:one, 2:one})) == Vec({0, 1, 2, 3, 4, 5, 6},{2: one})   
        True
        >>> find_error(Vec({0,1,2}, {})) == Vec({0,1,2,3,4,5,6}, {})
        True
    """
    index = sum((1 if x==one else 0)*(8>>(i+1)) for i, x in syndrome.f.items()) - 1  # convert syndrome to a number
    if index >= 0:
        e = Vec({0, 1, 2, 3, 4, 5, 6}, {index: one})  # the number corresponds to index of an error bit
    else:
        e = Vec({0, 1, 2, 3, 4, 5, 6}, {})
    return e

## Task 6
# Use the Vec class for your answers.
non_codeword = Vec({0,1,2,3,4,5,6}, {0:one, 1:0, 2:one, 3:one, 4:0, 5:one, 6:one})
error_vector = Vec({0,1,2,3,4,5,6}, {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:one})
code_word = Vec({0,1,2,3,4,5,6}, {0:one, 1:0, 2:one, 3:one, 4:0, 5:one, 6:0}) # error_vector + non_codeword
original = Vec({0,1,2,3}, {0:0, 1:one, 2:0, 3:one})  # R * code_word


## Task 7
def find_error_matrix(S):
    """
    Input: a matrix S whose columns are error syndromes
    Output: a matrix whose cth column is the error corresponding to the cth column of S.
    Example:
        >>> S = listlist2mat([[0,one,one,one],[0,one,0,0],[0,0,0,one]])
        >>> find_error_matrix(S) == Mat(({0, 1, 2, 3, 4, 5, 6}, {0, 1, 2, 3}), {(1, 3): 0, (3, 0): 0, (2, 1): 0, (6, 2): 0, (5, 1): one, (0, 3): 0, (4, 0): 0, (1, 2): 0, (3, 3): 0, (6, 3): 0, (5, 0): 0, (2, 2): 0, (4, 1): 0, (1, 1): 0, (3, 2): one, (0, 0): 0, (6, 0): 0, (2, 3): 0, (4, 2): 0, (1, 0): 0, (5, 3): 0, (0, 1): 0, (6, 1): 0, (3, 1): 0, (2, 0): 0, (4, 3): one, (5, 2): 0, (0, 2): 0})
        True
    """
    res = Mat(({0, 1, 2, 3, 4, 5, 6},S.D[1]), {})
    for i in res.D[1]:
        e = find_error(S[i])  # S[i] returns i-th column of S
        for j in res.D[0]:
            res[j,i] = e[j]

    return res

## Task 8
s = "I'm trying to free your mind, Neo. But I can only show you the door. You're the one that has to walk through it."
P = bits2mat(str2bits(s))  # p[i] column is 4-bit nibble

## Ungraded task
# Use noise(A, s) to produce the transmitted message
# input: P - matrix being transmitted
print("Message w/o encoding and ecc:", bits2str(mat2bits(P + noise(P, 0.02))).encode("utf-8"))

## Task 9
C = G*P  # encode
bits_before = len(str2bits(s))  # bits before encoding
bits_after = bits_before//4*7   # bits after encoding
print(bits_before, bits_after)

## Ungraded Task
CTILDE = C + noise(C, 0.02)  # encoded message received
print("Message with encoding, but w/o ecc:", bits2str(mat2bits(R*CTILDE)).encode("utf-8"))


## Task 10
def correct(A):
    """
    Input: a matrix A each column of which differs from a codeword in at most one bit (received encoded message)
    Output: a matrix whose columns are the corresponding valid codewords.
    Example:
        >>> A = Mat(({0,1,2,3,4,5,6}, {1,2,3}), {(0,3):one, (2, 1): one, (5, 2):one, (5,3):one, (0,2): one})
        >>> correct(A) == Mat(({0, 1, 2, 3, 4, 5, 6}, {1, 2, 3}), {(0, 1): 0, (1, 2): 0, (3, 2): 0, (1, 3): 0, (3, 3): 0, (5, 2): one, (6, 1): 0, (3, 1): 0, (2, 1): 0, (0, 2): one, (6, 3): one, (4, 2): 0, (6, 2): one, (2, 3): 0, (4, 3): 0, (2, 2): 0, (5, 1): 0, (0, 3): one, (4, 1): 0, (1, 1): 0, (5, 3): one})
        True
    """
    return A+find_error_matrix(H*A)  # H*A - matrix of error syndromes

# Applying error correction to CTILDE
CTILDE = correct(CTILDE)
print("Message with with ecc:", bits2str(mat2bits(R*CTILDE)).encode("utf-8"))
