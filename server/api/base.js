import reply from 'lib/reply'

export default (
  router =>
  router
  .get('/heartbeat', (req, res) => {
    reply(res, () => ({ a: 1 }))
  })
)
