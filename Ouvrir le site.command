#!/bin/zsh
cd "$(dirname "$0")"
/usr/bin/open 'http://127.0.0.1:4173/'
/usr/bin/python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
