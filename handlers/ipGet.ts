// var ipTrackingTableName = process.env.IP_TRACKING_TABLE_NAME

import { Handler, APIGatewayEvent } from "aws-lambda";
import * as AWSXRay from 'aws-xray-sdk-core';

// ONLY INITIALIZE CLIENT OPTION //
// We have to import the document client and activate after like this because it does not conform to sdk specifications.
// See: https://github.com/aws/aws-xray-sdk-node/issues/304 and https://github.com/aws/aws-xray-sdk-node/issues/23
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
const ddbDocClient: DocumentClient = new DocumentClient();
AWSXRay.captureAWSClient((ddbDocClient as any).service);

// getSourceIp will take an API Gateway Event and return the Source IP
export const getSourceIp = (event: APIGatewayEvent) => {
    try {
      return event.requestContext.identity.sourceIp;
    }
    catch(err) {
      // console.log(err);
      throw(err);
    }
};

// INITIALIZE ENTIRE AWS CLIENT OPTION //
// import * as uninstrumentedAWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
// const AWS = AWSXRay.captureAWS(uninstrumentedAWS);
// const ddbDocClient = new AWS.DynamoDB.DocumentClient();

export const ip: Handler = async (event, context, callback) => {

  const params = {
    TableName: process.env.IP_TRACKING_TABLE_NAME,
    Item: {
      id: context.awsRequestId,
      ip: getSourceIp(event)
    }
  }

  try {
    await ddbDocClient.put(params).promise()
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Your IP is " + params.Item.ip
        })
      }
    );
  }
  catch(err){
    callback(Error(err), {
        statusCode: 500,
        body: JSON.stringify({
          message: "Your IP is " + params.Item.ip
        })
      }
    );
  }
};
