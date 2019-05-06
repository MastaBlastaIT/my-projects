"""A module for dealing with BMP bitmap image files."""

def write_grayscale(filename, pixels):
    """Creates and writes a grayscale BMP file (1 byte per pixel).

    Args:
        filename: The name of the BMP file to be created.

        pixels: A rectangular image stored as a sequence of rows.
            Each row must be an iterable series of integers in the
            range 0-255.

    Raises:
        OSError: If the file couldn't be written
    """
    height = len(pixels)
    width = len(pixels[0])
    # TODO: add a check that all codes have the same length

    with open(filename, 'wb') as bmp:
        # BMP Header
        bmp.write(b'BM') # magic byte sequence identifying a BMP

        size_bookmark = bmp.tell()  # Save the offset from the beg of the file
        bmp.write(b'\x00\x00\x00\x00')  # Zero-placeholder for file size

        # The next 4 bytes are not used in BMP
        bmp.write(b'\x00\x00')  # Unused 16-bit integer - should be zero
        bmp.write(b'\x00\x00')  # Unused 16-bit integer - should be zero

        pixel_offset_bookmark = bmp.tell()  # Save the offset from the beg of the file
        bmp.write(b'\x00\x00\x00\x00')  # Zero-placeholder for # of bytes till picture data starts

        # Image header
        bmp.write(b'\x28\x00\x00\x00');  # Image header size in bytes - 40 decimal
        # 0x28 == 40, BMP format is little-endian
        bmp.write(_int32_to_bytes(width))  # Image width in pixels
        bmp.write(_int32_to_bytes(height))  # Image height in pixels
        bmp.write(b'\x01\x00')  # Number of image planes
        bmp.write(b'\x08\x00')  # Bits per pixel 8 for grayscale
        bmp.write(b'\x00\x00\x00\x00')  # No compression
        bmp.write(b'\x00\x00\x00\x00')  # Zero for uncompressed images
        bmp.write(b'\x00\x00\x00\x00')  # Unused pixels per meter
        bmp.write(b'\x00\x00\x00\x00')  # Unused pixels per meter
        bmp.write(b'\x00\x00\x00\x00')  # Used whole color table
        bmp.write(b'\x00\x00\x00\x00')  # All colors are important

        # Color palette - a linear grayscale
        for c in range(256):
            bmp.write(bytes((c, c, c, 0)))  # Blue, Green, Red, Alpha

        # Pixel data
            pixel_data_bookmark = bmp.tell()
            for row in reversed(pixels):  # BMP files are bottom to top
                row_data = bytes(row)
                bmp.write(row_data)

        # End of file
        eof_bookmark = bmp.tell()

        # Fill in file size placeholder
        bmp.seek(size_bookmark)
        bmp.write(_int32_to_bytes(eof_bookmark))

        # Fill in pixel offset placeholder
        bmp.seek(pixel_offset_bookmark)
        bmp.write(_int32_to_bytes(pixel_data_bookmark))


def _int32_to_bytes(i):
    """Convert an integer to four bytes in little-endian"""
    return bytes( (i & 0xff,
                   i >> 8 & 0xff,
                   i >> 16 & 0xff,
                   i >> 24 & 0xff) )


def dimensions(filename):
    """Determine the dimensions in pixels of a BMP image.

    Args:
        filename: The filename of a BMP file

    Returns:
        A tuple containing two integers with the width and height in px.

    Raises:
        ValueError: if not a BMP file.
        OSError: in case there is a problem in reading file from disk.
    """
    with open(filename,'rb') as f:
        magic = f.read(2)
        if magic != b'BM':
            raise ValueError("{} is not a BMP file".format(filename))

        f.seek(18)
        width_bytes = f.read(4)
        height_bytes = f.read(4)

        return (_bytes_to_int32(width_bytes),
                _bytes_to_int32(height_bytes))


def _bytes_to_int32(b):
    """Convert a bytes object containing four bytes into an integer."""
    return b[0] | (b[1]<<8) | (b[2]<<16) | (b[3]<<24)










