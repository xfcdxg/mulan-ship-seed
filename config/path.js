import { resolve } from 'path'
import { replace, compose } from 'ramda'

export const ROOT_PATH   = compose(resolve, replace(/\/config$/, ''))(__dirname)
