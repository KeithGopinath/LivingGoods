#!/bin/bash

sudo chown -R ubuntu:ubuntu /home/ubuntu/lg-mdm-react-test/

cd /home/ubuntu/lg-mdm-react-test/

docker image build -t lg-mdm-react .
