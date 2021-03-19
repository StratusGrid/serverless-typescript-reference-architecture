# Serverless TypeScript Reference Architecture

A Serverless Reference Architecture for TypeScript which has a number of Operational Best Practices demonstrated.

Currently demonstrated:

- Generating optimized Lambda packages with Webpack
- Using TypeScript functions and tests
- Moving handlers to a folder
- Regional API GW
- Run API Gateway locally
  - Use `serverless offline start`
- Support for unit tests
  - Run `npm test` to run your tests
- Sourcemaps for proper error messages
  - Error message show the correct line numbers
  - Works in production with CloudWatch
- Lint your code with ESLint
- Add environment variables for your stages
- No need to manage Webpack or Babel configs
- Alarms for functions
- CodeDeploy Alarm integration for lambda deployments
- CodeDeploy canary deployments for lambdas
- Multi-environment support (dev/stg/prd)
- SNS topics for different severities


Still needed:

- CodeDeploy Pre-hook and Post-hook integration tests
---
### Commands
NOTE: It can be helpful to wrap these with awsudo to feed the correct profile in.

Manually run tests:
```
npm test
```

Run a function on your local:
```
serverless invoke local --function hello --stage dev --region us-east-1
```

Simulate API Gateway locally (This uses the serverless-offline module):
```
serverless offline start --stage dev --region us-east-1
```

Deploy API GW custom domain name (must already have a matching cert in ACM):

NOTE: This is not needed if autoDomain: true in the customDomain configuration.
```
serverless create_domain --stage dev --region us-east-1
```

Deploy the project:
```
serverless deploy --stage dev --region us-east-1
```