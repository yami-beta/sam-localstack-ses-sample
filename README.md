# sam-localstack-ses-sample

This repository is a sample of following architecture.  
Lambda function for sending email by AWS SES.

- SAM Local
- LocalStack
- AWS SES

## Run

```sh
$ yarn run build
$ docker network create -d bridge sam-localstack
$ docker-compose up -d
$ sam local start-api --docker-network $(docker network inspect --format='{{.Id}}' sam-localstack) --env-vars env.json
```

## Test

```sh
$ docker-compose up -d
$ yarn test
```

