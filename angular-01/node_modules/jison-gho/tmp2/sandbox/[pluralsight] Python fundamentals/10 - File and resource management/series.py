"""Read and print an integer series."""

import sys


def read_series(filename):
    # # if int() throws exception, f.close() is never executed
    # # Inserted try..finally to fix that
    # try:
    #     f = open(filename, mode='rt', encoding='utf-8')
    #     # series = []
    #     # for line in f:
    #     #     a = int(line.strip())
    #     #     series.append(a)
    #
    #     # Refactor: replace for-loop with list comprehension
    #     return [ int(line.strip()) for line in f ]
    #
    # finally:
    #     # the finally block is called however the try block is exited
    #     f.close()
    # # return series

    # Refactor even more: use with-block
    with open(filename, mode='rt', encoding='utf-8') as f:
        return [ int(line.strip()) for line in f ]


def main(filename):
    series = read_series(filename)
    print(series)


if __name__ == '__main__':
    main(sys.argv[1])
