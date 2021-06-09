#!/bin/bash

cd /home/ubuntu/lg-mdm-react-test/
docker container run -d -p 7000:80 --name lg-mdm-react lg-mdm-react
