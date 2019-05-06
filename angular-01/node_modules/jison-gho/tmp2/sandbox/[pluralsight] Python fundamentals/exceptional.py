import sys
from math import log

def convert(s):
    '''Convert to an integer'''
	# Just let it fail!
	# if not isinstance(s, int): 
	#	raise TypeError("Argument must be a number")
    # x = -1    
    try:
        # x = int(s)
        return int(s)
        # print("Conversion succeeded! x=",x)
    except  (ValueError, TypeError) as e:  # Tuple of exception types
        print("Conversion error: {}"\
               .format(str(e)),
               file=sys.stderr)
        # pass # You should not normally catch IndentationError, SyntaxError, NameError
        # return -1  # return unpythonic error code
        raise # Instead, omit error message and re-raise the exception we are currently handling
        # Hence, callers need to know what exceptions to expect, and when (otherwise the execution stops)
        
    return x
    
# Wrapping good python convert function that handles exceptions is unpythonic 
def string_log(s):
    v = convert(s)
    return log(v) 
    