#!/bin/sh
 
ROOT_PATH="/home/bashmach/Workspaces/termos"
LOG="logs/process.log"

cd $ROOT_PATH
 
 pwd
 
echo "Run start" >> $LOG

if [ 0 -ge "$(ps -ef | grep -v grep | grep app.js | wc -l)" ]; then
   pm2 start src/processes.json
   echo "PM2 start" >> $LOG
fi

 
if [ 0 -ge "$(ps -ef | grep -v grep | grep mongod | wc -l)" ]; then
   mongod --dbpath $ROOT_PATH/store/ --smallfiles --fork --logpath=$ROOT_PATH/logs/mongod.log
   echo "mongod start" >> $LOG
fi

if [ 0 -ge "$(ls -la /etc/nginx/sites-enabled/ | grep -v grep | grep 1337.conf | wc -l)" ]; then

   /etc/init.d/apache2 stop

   rm /etc/nginx/sites-enabled/default

   ln -s $ROOT_PATH/conf/1337.conf /etc/nginx/sites-enabled/
   service nginx start
   echo "nginx restart" >> $LOG
fi