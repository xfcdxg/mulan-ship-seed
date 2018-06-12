import reply  from 'lib/reply'
import { pm2List, pm2Describe } from '../pm2'
import { log } from 'mulan-lib'

export default (
  router =>
  router
  // API心跳
  .get('/heartbeat', (req, res) => {
    reply(res, () => ({ b: 1 }), { type: 'jsonp' })
  })
  // 获取pm2启动的所有服务，包含非ship启动的
  .get('/list', (req, res) => {
    reply(res, pm2List, true)
  })
  // 获取单个服务的pm2信息
  .get('/describe/:process', (req, res) => {
    const { process } = req.params
    reply(res, cb => pm2Describe(process, cb), true)
  })
)
