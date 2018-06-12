import syncReply from 'lib/sync-reply'
import pm2       from 'pm2'

export default (
  router =>
  router
  .get('/heartbeat', (req, res) => {
    syncReply(res, () => ({ b: 1 }))
  })
  .get('/list', (req, res) => {
    pm2.list((err, list) => {
      syncReply(res, () => list)
    })
  })
)
