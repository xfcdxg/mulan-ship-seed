import { merge } from 'ramda'

export default (
  (res, fn, type = 'json', reply = { code: 0 }) => {
    try {
      reply = merge(reply, { data: fn() })
    } catch({ message, code }) {
      reply = merge(reply, { message, code })
    }
    res[type](reply)
  }
)
