import errorConfig from 'config/error'

export default ((message, code) => {
  const error = new Error(message)
  error.code = code
  return error
})

export const errstate = errorConfig
