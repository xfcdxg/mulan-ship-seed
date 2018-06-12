import pm2 from 'pm2'
import error, { errstate } from 'lib/error'

export const pm2List = cb => {
  pm2.list((err, list) => {
    if (err) cb(error(...errstate.PM2_LIST_ERROR))
    cb(null, list)
  })
}

export const pm2Describe = (process, cb) => {
  pm2.describe(process, (err, info) => {
    if (err) cb(error(...errstate.PM2_DESCRIBE_ERROR))
    cb(null, info)
  })
}
