export default ((message, code) => {
  const error = new Error(message)
  error.code = code
  return error
})

export const errstate = {
  //
  'FILE_EXISTS':    ['文件已存在', 10001],
  'FILE_NOT_FOUND': ['文件不存在', 10002],

  // pm2 error 12000 - 13000
  'PM2_LIST_ERROR':     ['获取PM2 List失败', 12001],
  'PM2_DESCRIBE_ERROR': ['获取服务信息失败', 12002],
}
