#!/usr/bin/env bash

if [ ${NODE_ENV} == 'development' ]
then
  echo "Trying run dev!"
  until cd /app && npm run before-start && npm run dev
  do
    echo "Trying run dev! 2"
  done
else
  echo "Trying run prod!"
  until cd /app && npm run before-start && npm run prod
  do
    echo "Trying run prod! 2"
  done
fi
