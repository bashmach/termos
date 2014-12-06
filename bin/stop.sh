#!/bin/sh
 
ROOT_PATH="/home/bashmach/Workspaces/termos"
LOG="logs/process.log"

cd $ROOT_PATH

echo "Run stop" >> $LOG

pm2 delete all

mongod --dbpath $ROOT_PATH/store/ --logpath=$ROOT_PATH/logs/mongod.log --shutdown

rm /etc/nginx/sites-enabled/1337.conf

ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/

service nginx stop

/etc/init.d/apache2 start