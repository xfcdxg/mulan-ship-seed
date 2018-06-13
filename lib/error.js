export default ((message, code) => {
  const error = new Error(message)
  error.code = code
  return error
})

export const errstate = {
  // base error 10000 - 12000
  'FILE_EXISTS':    ['文件已存在', 10001],
  'FILE_NOT_FOUND': ['文件不存在', 10002],

  // pm2 error 12001 - 13000
  'PM2_LIST_ERR':       ['获取PM2 List失败', 12001],
  'PM2_DESCRIBE_ERR':   ['获取服务信息失败', 12002],
  'PM2_LOG_ERR':        ['获取服务日志失败', 12003],
  'PM2_FLUSH_ERR':      ['刷新日志失败', 12004],
  'PM2_RELOADLOGS_ERR': ['重置日志失败', 12005],
}
