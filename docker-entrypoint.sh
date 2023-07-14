#!/usr/bin/env bash

cd /artist
yarn prisma migrate deploy
yarn prisma db push
yarn prisma db seed
yarn start:prod
