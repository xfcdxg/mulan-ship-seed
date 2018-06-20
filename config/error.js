export default ({
  // base error 10000 - 12000
  'FILE_EXISTS':    ['文件已存在', 10001],
  'FILE_NOT_FOUND': ['文件不存在', 10002],

  // pm2 error 12001 - 13000
  'PM2_LIST_ERR':       ['获取PM2 List失败', 12001],
  'PM2_DESCRIBE_ERR':   ['获取服务信息失败', 12002],
  'PM2_LOG_ERR':        ['获取服务日志失败', 12003],
  'PM2_FLUSH_ERR':      ['刷新日志失败', 12004],
  'PM2_RELOADLOGS_ERR': ['重置日志失败', 12005],

  // git error 13001 - 14000
  'GIT_REPO_ERROR': ['GIT仓库地址错误或包含无效字符', 13001],
  'GIT_REPO_EMPTY': ['GIT仓库地址未传入', 13002],
})
