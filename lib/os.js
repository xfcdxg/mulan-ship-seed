import os from 'os'

export default (
  () => ({
    platform: os.platform(),
    totalmem: os.totalmem(),
    freemem:  os.freemem(),
    cpus:     os.cpus(),
  })
)
