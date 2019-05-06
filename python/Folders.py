# find -iname "116*" -type f -exec cp {} ../ \;

import os
import sys

CsvFile = open('../clients.sites.csv', 'r')
clients = []

for line in CsvFile:
    line = (line[0:len(line) - 1]).split(',')
    clients.append(line)
    # sys.stdout.write(line)
CsvFile.close()

arch_directory = '../arch'
if not os.path.exists(arch_directory):
    os.makedirs(arch_directory)

new_directory = '../newcerts'
if not os.path.exists(new_directory):
    os.makedirs(new_directory)
for x in clients:

    directory = new_directory + '/' + x[0]
    if not os.path.exists(directory):
        os.makedirs(directory)
    os.system('find ../partner -iname "' + x[0] + '.*" -type f -exec mkdir -p ../newcerts/' +
              x[0] + '/partner \; -exec cp {} ../newcerts/' + x[0] + '/partner/ \;')
    partnerFile = open('../partner.crt.txt', 'r')
    passPartner = open(
        '../newcerts/' + x[0] + '/partner/CERTPASS_' + x[0] + '-partner.txt', 'w')
    for line in partnerFile:
        if x[0] in line:
            passPartner.write(line[0:len(line) - 1] + '\r\n')
    partnerFile.close()
    i = 1
    if os.path.exists('../newcerts/' + x[0] + '/api/'):
        passApi = open('../newcerts/' +
                       x[0] + '/api/CERTPASS_' + x[0] + '-api.txt', 'w')
    while i < len(x):
        os.system('find ../api -iname "' + x[i] + '.*" -type f -exec mkdir -p ../newcerts/' +
                  x[0] + '/api \; -exec cp {} ../newcerts/' + x[0] + '/api/ \;')
        apiFile = open('../api.crt.txt', 'r')
        passApi = open('../newcerts/' +
                       x[0] + '/api/CERTPASS_' + x[0] + '-api.txt', 'a')
        for line in apiFile:
            if x[i] in line:
                passApi.write(line[0:len(line) - 1] + '\r\n')
        apiFile.close()
        i += 1
passApi.close()
passPartner.close()

archPass = '?'
for y in clients:
    #archzip = zipfile.ZipFile('../arch/' + y[0] + '.zip', 'w')
    oldwd = os.getcwd()
    oldparent = os.path.abspath(os.path.join(oldwd, os.pardir))
    os.chdir('../newcerts/' + y[0])
    try:
        for root, dirs, files in os.walk('.'):
            for file in files:
                # archzip.write(os.path.join(root,file))
                os.system('zip -P ' + archPass + ' -r -q ' + oldparent +
                          '/arch/' + y[0] + '.zip ' + os.path.join(root, file))
    finally:
        os.chdir(oldwd)
        # archzip.close()
