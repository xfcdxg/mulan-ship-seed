import { merge } from 'ramda'
import { log } from 'mulan-lib'

export default (
  (res, fn, is_async, params = {}, base = { code: 0 }) => {

    if (typeof is_async === 'object') {
      params = is_async
      is_async = false
    }

    const { type = 'json' } = params

    const reply = info => res[type](merge(base, info))

    if (is_async) {
      fn((err, data) => {
        if (err) {
          const { message, code } = err
          reply({ message, code })
        }
        reply({ data })
      })
      return
    }

    try {
      reply({ data: fn() })
    } catch({ message, code }) {
      reply({ message, code })
    }
  }
)
