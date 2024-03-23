import { OpenAPIHono } from '@hono/zod-openapi'
import { payController, swaggerController, userController } from './controllers'
import { cors } from 'hono/cors'

type Bindings = { hirai: KVNamespace }

const app: any = new OpenAPIHono<{ Bindings: Bindings }>()
app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}))
swaggerController(app)
userController(app)
payController(app)

export default app
