import sys


def main(filename):
    f = open(filename, mode='rt', encoding='utf-8')
    for line in f:
        #print(line)  # generates extra blank line for each line
        sys.stdout.write(line)
    f.close()

if __name__ == '__main__':
    main(sys.argv[1])
