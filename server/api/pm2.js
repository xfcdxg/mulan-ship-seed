import reply  from 'lib/reply'
import { pm2List, pm2Describe, pm2DescribeFull, pm2Log, pm2FlushLog, pm2ReloadLog } from 'lib/pm2'
import { log } from 'mulan-lib'

export default (
  router =>
  router
  // API心跳
  .get('/heartbeat', (req, res) => {
    reply(res, () => ({ b: 1 }))
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
  .get('/describe/full/:process', (req, res) => {
    const { process } = req.params
    reply(res, cb => pm2DescribeFull(process, cb), true)
  })
  // 获取错误日志
  .get('/log/err/:process', (req, res) => {
    const { process } = req.params
    reply(res, cb => pm2Log(process, 'err', cb), true)
  })
  // 获取打印日志
  .get('/log/out/:process', (req, res) => {
    const { process } = req.params
    reply(res, cb => pm2Log(process, 'out', cb), true)
  })
)


// 弃用
// .get('/flush/:process', (req, res) => {
//   const { process } = req.params
//   reply(res, cb => pm2FlushLog(process, cb), true)
// })
// .get('/reload/:process', (req, res) => {
//   const { process } = req.params
//   reply(res, cb => pm2ReloadLog(process, cb), true)
// })
