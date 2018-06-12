import syncReply from 'lib/sync-reply'

export default (
  router =>
  router.get('/heartbeat', (req, res) => {
    syncReply(res, () => ({ a: 1 }))
  })
)
