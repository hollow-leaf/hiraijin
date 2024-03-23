// lobby function
import { OpenAPIHono, createRoute } from "@hono/zod-openapi"
import { UserSchema, ParamsSchema, RegisterSchema, RegisterParamsSchema, bodySchema } from "../models/userModel"
import { createWallets } from "../service/userService"
import { getBalance } from "../service/usdcService"
import { createController, ResponseType } from "../utils"
const responses: ResponseType[] = [
  {
    statusCode: 200,
    content: {
      'application/json': {
        schema: UserSchema,
      },
    },
    description: 'Retrieve the user',
  },
  {
    statusCode: 404,
    description: 'User not found',
  },
];

const UserController = createController('get', '/users/{id}', ParamsSchema, responses)

const RegisterResponses: ResponseType[] = [

  {
    statusCode: 200,
    content: {
      'application/json': {
        schema: RegisterParamsSchema,
      },
    },
    description: 'Retrieve the user',
  },
  {
    statusCode: 404,
    description: 'User not found',
  },
];
const RegisterController = createController('post', '/register/{id}', RegisterParamsSchema, RegisterResponses, bodySchema)


export default (app: OpenAPIHono) => {
  // path: /users/{id}
  app.openapi(UserController, async (c: any) => {
    const { id } = c.req.valid('param') as any
    const walletID = await c.env.hirai?.get(`${id}-id`)
    const balance: any = await getBalance(walletID)
    const walletAddress = await c.env.hirai?.get(`${id}-address`)
    if( balance.data.tokenBalances.length === 0 ) {
      return c.json({
        id,
        walletID,
        walletAddress,
        balance: '0',
        tokenId: '0'
      })
    } else {
      return c.json({
        id,
        walletID,
        walletAddress,
        balance: balance.data.tokenBalances[1].amount,
        tokenId: balance.data.tokenBalances[1].token.id
      })
    }
  })

  app.openapi(RegisterController, async (c: any) => {
    const { id } = c.req.valid('param') as any
    const {data} = c.req.valid('json') as any
    const newWallet: any = await createWallets()
    // console.log('newWallet', newWallet.data.wallets[0])
    const walletID = newWallet.data.wallets[0].id
    const walletAddress = newWallet.data.wallets[0].address
    // generate a cool qrcode
    await c.env.hirai?.put(`${id}-id`, `${walletID}`)
    await c.env.hirai?.put(`${id}-address`, `${walletAddress}`)

    // const { data, signature, publicKey } = c.req.valid('query') as any
    return c.json({   
      id,
      walletID,
      walletAddress
    })
  })
}