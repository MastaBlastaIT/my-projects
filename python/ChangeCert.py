import os
import datetime
import sys
import time

sys.stdout.write("\x1b[8;{rows};{cols}t".format(rows=30, cols=150))

def progress(count, total, status=''):
    bar_len = 60
    filled_len = int(round(bar_len * count / float(total)))

    percents = round(100.0 * count / float(total), 1)
    bar = '=' * filled_len + '-' * (bar_len - filled_len)

    print('[%s] %s%s ...%s\r' % (bar, percents, '%', status))

d0 = datetime.datetime.now().date()
d1 = datetime.date(2018, 9, 22)
delta = d1 - d0

x = '"Коллеги, добрый день!\n\nНаблюдаем, что Вы со своей стороны не произвели замену старых сертификатов на новые.\n\nНастоятельная просьба не откладывать замену сертификатов.\nТекущие сертификаты будут действовать до 22.09.2018 ("' + str(delta.days)

mod = (delta.days) % 10
if mod in range(2,5):
    y = '" ДНЯ).\n\nПриносим извинения за доставленные неудобства.\n\nС уважением,\nСлужба технической поддержки клиентов\nООО «ОНЭЛИЯ»"'
elif mod == 1:
    y = '" ДЕНЬ).\n\nПриносим извинения за доставленные неудобства.\n\nС уважением,\nСлужба технической поддержки клиентов\nООО «ОНЭЛИЯ»"'
else:
    y = '" ДНЕЙ).\n\nПриносим извинения за доставленные неудобства.\n\nС уважением,\nСлужба технической поддержки клиентов\nООО «ОНЭЛИЯ»"'


certList = []
for line in open('certs.txt','r'):
    certList.append(line[0:len(line)-1])
tosend = ''
counter = 0
for elem in open('sites.csv','r'):
    elems = (elem[0:len(elem)-1]).split(',')
    for line in certList:
        if counter == 0:
            progress(counter, len(certList), status='\033[1;44mSending mail started\033[1;m')
            counter += 1
        if line in elems:
            i = 1
            tosend = ''
            while i < len(elems):
                tosend += (elems[i] + ' ')
                i += 1
            sub = 'Установка новых сертификатов для ' + line
            #os.system('echo ' + x + y + ' | mail -s "' + sub + '" '+ tosend + ' -c mail@mail.mail -c mail@mail.mail -aFrom:mail@mail.mail -a"Content-Type: text/plain; charset=utf-8"')
            os.system('echo ' + x + y + ' | mutt -s "' + sub + '" ' + tosend + ' -b mail@mail.mail -b mail@mail.mail')
            progress(counter, len(certList), status='\033[1;42m' + line +'\033[1;m' + ' has sent')
            counter += 1
            time.sleep(0.5)
print('\033[1;41mFinished!\033[1;m')
