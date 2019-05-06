import os

# importing modules from package reader.compressed into current namespace
from reader.compressed import bzipped, gzipped

extension_map = {
    '.bz2': bzipped.opener,
    '.gz': gzipped.opener,
}

class Reader:
    def __init__(self, filename):
        # self.filename = filename
        extension = os.path.splitext(filename)[1]
        opener = extension_map.get(extension, open)
        self.f = opener(filename, 'rt')

    def close(self):
        self.f.close()

    def read(self):
        return self.f.read()
