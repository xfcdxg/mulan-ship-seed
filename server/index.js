import 'babel-register'
import express       from 'express'
import bodyParser    from 'body-parser'
import { log }       from 'mulan-lib'
import defineApi     from './api'
import { port }      from '../config'

const server =
defineApi(express)
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: true }))

server.listen(port, () => log('server run at ' + port))
