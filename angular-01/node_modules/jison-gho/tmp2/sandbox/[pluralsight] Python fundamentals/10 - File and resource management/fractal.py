"""Computing Mandelbrot sets."""

import math

def mandel(real, imag):
    """The logarithm of number of iterations needed to determine whether
    determine whether a complex point is in the Mandelbrot set.
    The result is normalized to [0,255] range for pixel output.

    Args:
        real: The real coordinate
        imag: The imaginary coordinate

    Returns:
        An integer in the range 1-255.
    """
    x = 0
    y = 0
    for i in range(1, 257):
        if x*x + y*y > 4.0:
            break
        # z_{n+1} = z_n^2 + (real, imag)
        xt = real + x*x - y*y
        y = imag + 2.0 * x * y
        x = xt
    return int(math.log(i)/math.log(256)*256) - 1  # 0 <=log_256(i) <= 1 => the result 0<=...<=255


def mandelbrot(size_x, size_y):
    """Make an Mandelbrot set image.

    Args:
        size_x: Image width
        size_y: Image height

    Returns:
        A list of lists of integers in the range 0-255.
    """
    # Mandelbrot set lies within the range [(-2.5,1), (-1,1)]
    return [ [mandel((3.5 * x / size_x) - 2.5,  # so resulting image is in [-2.5,1]
                     (2.0 * y / size_y) - 1.0)  # so resulting image is in [-1,1]
              for x in range(size_x)]
             for y in range(size_y) ]