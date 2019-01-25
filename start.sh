#!/usr/bin/env bash
if [ "$1" = "" ]
then
    echo "Starting Default integration"
    ng serve --proxy-config proxy.conf.int.json --ssl true
else
    echo "Starting " $1
    ng serve --proxy-config proxy.conf.$1.json --ssl true
fi

