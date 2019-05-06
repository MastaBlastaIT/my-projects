#find -iname "116*" -type f -exec unzip -l {} \; > list.txt

import os

list = open('list.txt','w+')
list.write('LIST OF FILES\n')

clientFile = open('partnerList.txt','r')
clients = []

for line in clientFile:
    clients.append(line[0:len(line)-1])

clientFile.close()

for x in clients:
    os.system('find -iname "' + x + '.*" -type f -exec unzip -l {} \; >> list.txt')
