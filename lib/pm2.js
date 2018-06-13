import pm2 from 'pm2'
import { merge, equals } from 'ramda'
import { moment, timeDuration, log } from 'mulan-lib'
import { exec }  from 'child_process'
import { logDateFormat } from 'config'
import { readFileSync } from 'fs'
import error, { errstate } from 'lib/error'

const beautify = process => {
  const { pm_id, pid, name, pm2_env, monit } = process
  const { versioning, exec_mode, instances = 1, status, created_at, pm_uptime } = pm2_env
  log(created_at, pm_uptime, created_at-pm_uptime)
  let reply = {
    pm_id, pid, name, exec_mode, instances, status, uptime: timeDuration(pm_uptime, moment('x')()),
    created_at: moment(logDateFormat)(created_at), monit
  }

  if (versioning) {
    const { revision, prev_rev, branch } = versioning
    reply = merge(reply, { revision, prev_rev, branch })
  }

  return reply
}

export const pm2List = cb => {
  pm2.list((err, list) => {
    if (err) cb(error(...errstate.PM2_LIST_ERR))
    cb(null, list.map(process => beautify(process)))
  })
}

export const pm2DescribeFull = (process, cb) => {
  pm2.describe(process, (err, list) => {
    if (err) cb(error(...errstate.PM2_DESCRIBE_ERR))
    cb(null, list)
  })
}

export const pm2Describe = (process, cb) => {
  pm2DescribeFull(process, (err, list) => {
    if (err) cb(err)
    cb(null, list.map(process => beautify(process)))
  })
}

export const pm2Log = (process, type, cb) => {
  pm2DescribeFull(process, (err, list) => {
    if (err) cb(error(...errstate.PM2_LOG_ERR))

    const { pm2_env } = list[0]
    const { pm_out_log_path, pm_err_log_path } = pm2_env

    const log = readFileSync(equals('out', type) ? pm_out_log_path : pm_err_log_path, { encoding: 'utf8' })

    cb(null, log)
  })
}


// 弃用
// export const pm2FlushLog = (process, cb) => {
//   pm2.flush((err, result) => {
//     if (err) cb(error(...errstate.PM2_FLUSH_ERR))
//     cb(null, result)
//   })
// }
//
// export const pm2ReloadLog = (process, cb) => {
//   pm2.reloadLogs((err, result) => {
//     if (err) cb(error(...errstate.PM2_RELOADLOGS_ERR))
//     cb(null, result)
//   })
// }
