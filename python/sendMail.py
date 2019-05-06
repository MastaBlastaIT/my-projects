#zip -P 89310689 -r moyreys.zip moyreys/
import os
import sys
import time

sys.stdout.write("\x1b[8;{rows};{cols}t".format(rows=30, cols=195))

def progress(count, total, status=''):
    bar_len = 60
    filled_len = int(round(bar_len * count / float(total)))

    percents = round(100.0 * count / float(total), 1)
    bar = '=' * filled_len + '-' * (bar_len - filled_len)

    print('[%s] %s%s ...%s\r' % (bar, percents, '%', status))

#contactsFile = open('../clients.contacts.csv','r')
contactsFile = open('../sites.csv','r')

for line in contactsFile:
    contact = line.split(',')
    subject = 'Перевыпуск сертификатов для ' + contact[0]
    attachment = '../arch/' + contact[0] + '.zip'
    phone = contact[len(contact) - 1]
    phone = "+7 (" + phone[1:4] + ") " + phone[4:7] + "-" + phone[7:9] + "-" + phone[9:12]
    email = ""
    if len(contact) > 3:
        i = 1
        while i < len(contact)-1:
            email += (contact[i] + " ")
            i += 1
        email = email[0:len(email)-1]
    else:
        email = contact[1]
    if "?" not in phone:
#        message = '''Коллеги, здравствуйте!\n\nВ связи со скорым окончанием срока действия SSL-сертификатов (22.09.2018) высылыаем Вам перевыпущенные сертификаты сроком действия до 22.09.2019.
#СМС с паролем от архива отправили на номер ''' + phone[0:len(phone)-1] + '''. Если данный номер телефона неактуален или неверен, огромная просьба прислать актуальный в ответном письме!
#
#По вопросам, связанным с перевыпуском и установкой сертификатов, обращайтесь, пожалуйста, по тел. +7 499 110 98 82 доб. 116(117) или по email: mail@mail.mail
#
#С уважением,
#Служба технической поддержки клиентов
#ООО «ОНЭЛИЯ»'''
        message = '''Коллеги, здравствуйте!\n\nДублируем Вам перевыпущенные сертификаты сроком действия до 22.09.2019.
СМС с паролем от архива отправили на номер ''' + phone[0:len(phone)-1] + '''. Если данный номер телефона неактуален или неверен, огромная просьба прислать актуальный в ответном письме!


По вопросам, связанным с перевыпуском и установкой сертификатов, обращайтесь, пожалуйста, по тел. +7 499 110 98 82 доб. 116(117) или по email: mail@mail.mail/mail@mail.mail


С уважением,
Служба технической поддержки клиентов
ООО «ОНЭЛИЯ»'''
    else:
        message = '''Коллеги, здравствуйте!\n\nВ связи со скорым окончанием срока действия SSL-сертификатов (22.09.2018) высылыаем Вам перевыпущенные сертификаты сроком действия до 22.09.2019.
Просьба прислать в ответном письме номер телефона, на который можно отправить СМС-сообщение с паролем от архива!

По вопросам, связанным с перевыпуском и установкой сертификатов, обращайтесь, пожалуйста, по тел. +7 499 110 98 82 доб. 116(117) или по email: mail@mail.mail/mail@mail.mail

С уважением,
Служба технической поддержки клиентов
ООО «ОНЭЛИЯ»'''
        #os.system('''echo "''' + message + '''" | mutt -s "''' + subject + '''" ''' + email + ''' -aFrom:mail@mail.mail -a"Content-Type: text/plain; charset='UTF-8'"''')
    if ("h2online" in contact[0]):
        progress(0, 1, status='\033[1;44mSending mail started\033[1;m')
        #time.sleep(0.5)
        #print(subject)
        #print(message)
        #print(email)
#        message = '''Коллеги, здравствуйте!\n\nДублируем Вам перевыпущенные сертификаты сроком действия до 22.09.2019.
#Просьба прислать в ответном письме номер телефона, на который можно отправить СМС-сообщение с паролем от архива!
#
#По вопросам, связанным с перевыпуском и установкой сертификатов, обращайтесь, пожалуйста, по тел. +7 499 110 98 82 доб. 116(117 или 119) или по email: mail@mail.mail/mail@mail.mail
#
#С уважением,
#Служба технической поддержки клиентов
#ООО «ОНЭЛИЯ»'''
        os.system('''echo "''' + message + '''" | mutt -b mail@mail.mail -s "''' + subject + '''" ''' + email + ''' -a ''' + attachment)

        progress(1, 1, status='\033[1;42m' + contact[0] +'\033[1;m' + ' has sent')
print('\033[1;41mFinished!\033[1;m')
