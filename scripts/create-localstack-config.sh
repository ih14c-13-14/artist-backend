#!/usr/bin/env bash

LOCALSTACK_ENDPOINT=http://localstack:4566

# LocalStack用にawscliのプロファイルを作る
aws configure --profile localstack set aws_access_key_id dummy
aws configure --profile localstack set aws_secret_access_key dummy
aws configure --profile localstack set region ap-northeast-1
aws configure --profile localstack set output json

# create S3 bucket
aws --endpoint-url ${LOCALSTACK_ENDPOINT} s3 mb s3://artist-media --profile localstack
