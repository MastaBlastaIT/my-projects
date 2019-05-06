import sys

def sqrt(x):
    '''Compute square roots using the method of Heron of Alexandria.
    
    Args:
        x: The number for which the square root is to be computed.
        
    Returns:
        The square root of x.
        
    Raises:
        ValueError: If x is negative.
    '''
    
    if x<0:
        raise ValueError("Cannot compute square root "
                         "of negative number {}".format(x))
    
    guess = x
    i = 0
    while guess*guess!=x and i<20:
        guess = (guess + x/guess)/2.0
        i += 1
    return guess

def main(number=9):
    try:
        print(sqrt(number))
        print(sqrt(2))
        print(sqrt(-1))
        print("This is never printed.")
    #except ZeroDivisionError: # Handle exception to prevent program from stopping
    #    print("Cannot compute square root of a negative number.")
    except ValueError as e:
        print(e, file=sys.stderr)
    print("Program execution continues normally here.")
    
if __name__=='__main__': # If launched via python roots.py 9
    if len(sys.argv)==2:
        main(int(sys.argv[1]))
    else:
        main()