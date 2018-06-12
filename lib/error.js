export default ((message, code) => {
  const error = new Error(message)
  error.code = code
  return error
})

export const errstate = {
  'FILE_EXISTS':    ['文件已存在', 10001],
  'FILE_NOT_FOUND': ['文件不存在', 10002],
}
