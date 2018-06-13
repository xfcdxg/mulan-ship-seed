import reply from 'lib/reply'
import getOs from 'lib/os'
export default (
  router =>
  router
  .get('/heartbeat', (req, res) => {
    reply(res, () => 1)
  })
)
