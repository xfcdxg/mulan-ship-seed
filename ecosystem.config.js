module.exports = {
  apps : [
    // First application
    {
      name            : "mulan-ship-seed",
      watch           : true,
      script          : "./server",
      interpreter     : './node_modules/.bin/babel-node',
      log_date_format : 'MM-DD HH:mm:ss',
      merge_logs      : true,
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production   : {
        NODE_ENV: "production"
      }
    }
  ]
}
