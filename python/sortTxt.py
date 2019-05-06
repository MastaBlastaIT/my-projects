import sys
import os

#apiFile = open('api.crt.txt', 'r')
#api = []
#
#for a in apiFile:
#    api.append(a)
#api.sort()
#apiFile.close()
#
#apiFile = open('api.crt.txt', 'w')
#for x in api:
#    apiFile.write(x)

partnerFile = open('partner.crt.txt','r')
partner = []

for p in partnerFile:
    partner.append(p)
partner.sort()
partnerFile.close()

partnerFile = open('partner.crt.txt', 'w')
for y in partner:
    partnerFile.write(y)
partnerFile.close()

i = 0
for y in partner:
    y = (y.split(':')[0]).split('.')[0] if (y.split(':')[0]).find('.') > -1 else y.split(':')[0]
    partner[i] = y
    i += 1

partner = sorted(set(partner))
file = open('partnerList.txt','w')
for y in partner:
    #print(y)
    file.write(y+'\n')
file.close()
