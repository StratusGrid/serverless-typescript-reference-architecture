import {APIGatewayEvent, Context, Handler} from "aws-lambda";
import * as handler from "../handlers/ipGet";

test("ip", async () => {
  const event: APIGatewayEvent = { requestContext: {identity: {sourceIp: "24.179.86.241"}}} as APIGatewayEvent;
  const context = {} as Context;

  const response = await handler.getSourceIp(event);

  expect(typeof response).toBe("string");
  expect(response).toBe("24.179.86.241");
});
