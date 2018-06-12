import pm2 from 'pm2'
import { merge } from 'ramda'
import { moment, log } from 'mulan-lib'
import { exec }  from 'child_process'
import { readFileSync } from 'fs'
import error, { errstate } from 'lib/error'


const beautify = process => {
  const { pm_id, pid, name, pm2_env } = process
  const { versioning, exec_mode, instances = 1, status, created_at } = pm2_env

  let reply = {
    pm_id, pid, name, exec_mode, instances, status,
    created_at: moment('MM/DD HH:mm:ss')(created_at)
  }

  if (versioning) {
    const { revision, prev_rev, branch } = versioning
    reply = merge(reply, { revision, prev_rev, branch })
  }

  return reply
}

export const pm2List = cb => {
  pm2.list((err, list) => {
    if (err) cb(error(...errstate.PM2_LIST_ERROR))
    cb(null, list.map(process => beautify(process)))
  })
}

export const pm2DescribeFull = (process, cb) => {
  pm2.describe(process, (err, list) => {
    if (err) cb(error(...errstate.PM2_DESCRIBE_ERROR))
    cb(null, list)
  })
}

export const pm2Describe = (process, cb) => {
  pm2DescribeFull(process, (err, list) => {
    if (err) cb(error(...errstate.PM2_DESCRIBE_ERROR))
    cb(null, list.map(process => beautify(process)))
  })
}

export const pm2Log = (process, cb) => {
  pm2DescribeFull(process, (err, list) => {
    if (err) cb(error(...errstate.PM2_DESCRIBE_ERROR))

    const { pm2_env } = list[0]
    const { pm_out_log_path, pm_err_log_path } = pm2_env
    cb(null, {
      err: readFileSync(pm_err_log_path, { encoding: 'utf8' }),
      out: readFileSync(pm_out_log_path, { encoding: 'utf8' })
    })
  })
}
