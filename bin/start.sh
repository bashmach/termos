#!/bin/sh
 
LOG="logs/process.log"
 
echo "Run start" >> $LOG

if [ 0 -ge "$(ps -ef | grep -v grep | grep app.js | wc -l)" ]; then
   pm2 start src/processes.json
   echo "PM2 start" >> $LOG
fi

 
if [ 0 -ge "$(ps -ef | grep -v grep | grep mongod | wc -l)" ]; then
   mongod --dbpath ./store/ --smallfiles --fork --logpath=./logs/mongod.log
   echo "mongod start" >> $LOG
fi