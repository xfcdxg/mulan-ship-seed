import reply from 'lib/reply'
import getOs from 'lib/os'
import { git } from 'lib/publish'

export default (
  router =>
  router
  .all('/t', (req, res) => {
    reply(res, () => {
      const { body, query } = req
      return { body, query }
    })
  })
  .get('/heartbeat', (req, res) => {
    reply(res, () => 1)
  })
  .post('/publish/git', (req, res) => {
    console.log(req.body)
    reply(res, () => git(req.body))
  })
)
