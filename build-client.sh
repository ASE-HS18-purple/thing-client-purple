#!/bin/bash

cp -r ../thingy-api-purple ./thingy-api-purple

docker build -t harperkej/thingy-client-purple .
