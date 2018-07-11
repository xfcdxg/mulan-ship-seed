import express    from 'express'
import bodyParser from 'body-parser'
import { log }    from 'mulan-lib'
import { port }   from 'config'
import defineApi  from './api'
import validator  from './middleware/validator'

const server =
defineApi(
  express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  // 验签中间件
  // .use(validator())
)

server.listen(port, () => log('seed run at ' + port))
