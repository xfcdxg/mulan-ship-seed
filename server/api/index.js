import express from 'express'
import { log } from 'mulan-lib'
import baseApi from './base'
import pm2Api  from './pm2'

export default (
  server =>
  server
    .use('/api',     baseApi(express.Router()))
    .use('/api/pm2', pm2Api(express.Router()))
)
