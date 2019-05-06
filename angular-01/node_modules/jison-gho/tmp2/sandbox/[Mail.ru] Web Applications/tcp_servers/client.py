#!/usr/bin/env python

import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('127.0.0.1', 8080))
s.send('Hello World'.encode(encoding='utf-8'))
print(s.recv(1024))
s.close()