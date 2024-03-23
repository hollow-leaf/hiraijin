import { OpenAPIHono } from '@hono/zod-openapi'
import { payController, swaggerController, userController } from './controllers'
import { cors } from 'hono/cors'

type Bindings = { hirai: KVNamespace }

const app: any = new OpenAPIHono<{ Bindings: Bindings }>()
app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Origin'], // Include 'Access-Control-Allow-Methods' in allowHeaders
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  maxAge: 600,
  credentials: true,
}))

app.options('*', (c: any) => {
  return c.text('', 204)
})
swaggerController(app)
userController(app)
payController(app)

export default app
