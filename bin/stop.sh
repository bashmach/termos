#!/bin/sh
 
LOG="logs/process.log"

echo "Run stop" >> $LOG

pm2 delete all

mongod --shutdown