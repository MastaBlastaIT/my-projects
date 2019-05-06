# version code 80e56511a793+
# Please fill out this stencil and submit using the provided submission script.





## 1: (Problem 0.8.3) Tuple Sum
def tuple_sum(A, B):
    '''
    Input:
      -A: a list of tuples
      -B: a list of tuples
    Output:
      -list of pairs (x,y) in which the first element of the
      ith pair is the sum of the first element of the ith pair in
      A and the first element of the ith pair in B
    Examples:
    >>> tuple_sum([(1,2), (10,20)],[(3,4), (30,40)])
    [(4, 6), (40, 60)]
    >>> tuple_sum([(0,1),(-1,0),(2,2)], [(3,4),(5,6),(7,8)])
    [(3, 5), (4, 6), (9, 10)]
    '''
    # Option 1 (arbitrary # of elements in tuples)
    # C = []
    # for i, a in enumerate(A):
    #     C.append(tuple(map(lambda x,y: x+y, A[i], B[i])))
    # return C

    # Option 2 (two elements in each tuple)
    # return [(a[0]+b[0],a[1]+b[1]) for a, b in zip(A,B)]

    # Option 3 (the best)
    return [tuple(x+y for x, y in zip(a, b)) for a, b in zip(A, B)]

# # Using lambda functions with multiple arguments
# print(list(map(lambda x,y: x+y, [2,3],[4,2])))  # Sum of elements in two lists
# print(list(map(lambda a,b: (a[0]+b[0], a[1]+b[1]), [(2,3),(2,3)],[(4,2),(4,2)])))  # Required task

## 2: (Problem 0.8.4) Inverse Dictionary
def inv_dict(d):
    '''
    Input:
      -d: dictionary representing an invertible function f
    Output:
      -dictionary representing the inverse of f, the returned dictionary's
       keys are the values of d and its values are the keys of d
    Example:
    >>> inv_dict({'goodbye':  'au revoir', 'thank you': 'merci'}) == {'merci':'thank you', 'au revoir':'goodbye'}
    '''
    # Option 1
    # return {val: key for key, val in d.items()}

    # Option 2
    return {d[k]:k for k in d.keys()}



## 3: (Problem 0.8.5) Nested Comprehension
def row(p, n):
    '''
    Input:
      -p: a number
      -n: a number
    Output:
      - n-element list such that element i is p+i
    Examples:
    >>> row(10,4)
    [10, 11, 12, 13]
    '''
    return [x for x in range(p,p+n)]

# Write a comprehension whose value is a 15-element list of 20-element lists such that the j-th element of the
# i-th list is i+j
comprehension_with_row = [row(i, 20) for i in range(15)]

# Same comprehension but w/o row(p). Hint: replace the call to row(p, n) with the comprehension that forms the
# body of row(p, n)
comprehension_without_row = [ [x for x in range(i,i+20)] for i in range(15) ]



## 4: (Problem 0.8.10) Probability Exercise 1
# A function f(x)=x+1 with domain {1, 2, 3, 4, 5, 6} and codomain {2, 3, 4, 5, 6, 7} has the following prob function
# on its domain: Pr(1) = 0.5, Pr(2) = 0.2, Pr(3) = Pr(5) = Pr(6) = 0.1.
# What is the probability of getting an even number as an output of f(x)? An odd number?
P1 = {1: 0.5, 2: 0.2, 3: 0.1, 4: 0, 5: 0.1, 6: 0.1}  # prob distribution
Pr_f_is_even = sum([P1[x] for x in P1.keys() if (x+1)%2==0])
Pr_f_is_odd  = sum([P1[x] for x in P1.keys() if (x+1)%2])



## 5: (Problem 0.8.11) Probability Exercise 2
# A function g(x) = x mod 3 with domain {1, 2, ..., 7} and codomain {0, 1, 2} has the following prob function
# on its domain: Pr(1) = Pr(2) = Pr(3) = 0.2, Pr(4) = Pr(5) = Pr(6) = Pr(7) = 0.1.
# What is the prob of getting 1 as an output of g(x)? What is the prob of getting 0 or 2?
P2 = {1: 0.2, 2: 0.2, 3: 0.2, 4: 0.1, 5: 0.1, 6: 0.1, 7:0.1}  # prob distribution
Pr_g_is_1    = sum([P2[x] for x in P2.keys() if x%3==1 ])
Pr_g_is_0or2 = sum([P2[x] for x in P2.keys() if x%3==2 or x%3==0 ])