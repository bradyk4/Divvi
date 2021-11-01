// Create connection to database
var config = {
  server: 'divvi.database.windows.net',
  database: 'divvi',
  authentication: {
      type: 'default',
      options: {
          userName: 'bradyk4', // update me
          password: 'Pa$$w0rd' // update me
      }
  },
  options: {
      database: 'divvi'
  }
}

module.exports = config;