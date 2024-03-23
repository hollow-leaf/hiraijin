// lobby function
import { OpenAPIHono } from "@hono/zod-openapi"
import { paySchema, bodySchema } from "../models/payModel"
import { createController, ResponseType } from "../utils"
import { transfer } from "../service/usdcService";
const responses: ResponseType[] = [
  {
    statusCode: 200,
    content: {
      'application/json': {
        schema: paySchema,
      },
    },
    description: 'Retrieve the user',
  },
  {
    statusCode: 404,
    description: 'User not found',
  },
];

const UserController = createController('post', '/pay/{id}', paySchema, responses, bodySchema)

export default (app: OpenAPIHono) => {
  // path: /users/{id}
  app.openapi(UserController, async (c: any) => {
    const { id } = c.req.valid('param') as any
    const walletAddress = await c.env.hirai?.get(`${id}-address`)
    const { amount } = c.req.valid('json') as any
    const result =  await transfer('b483cd70-2368-515f-8524-7ac0241ea4fc', walletAddress, '6e09e3b7-48de-520d-bd8e-9620558c2b7e', amount)
    return c.json({
      result
    })
  })
}