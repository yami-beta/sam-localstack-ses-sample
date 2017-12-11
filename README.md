# sam-localstack-ses-sample

Test Lambda function (send email with AWS SES) by SAM Local and LocalStack.

- sam-local
- localstack
- AWS SES

## Test

```sh
$ docker network create -d bridge sam-localstack
$ docker-compose up -d
$ sam local start-api --docker-network $(docker network inspect --format='{{.Id}}' sam-localstack) --env-vars env.json
```

