import { log }   from 'mulan-lib'
import baseApi   from './base'
import pm2Api    from './pm2'

export default (
  express => {
    const server = express()

    return server
    .use('/api',     baseApi(express.Router()))
    .use('/api/pm2', pm2Api(express.Router()))
  }
)
