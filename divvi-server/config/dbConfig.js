// Create connection to database
var config = {
  server: 'divvi.database.windows.net',
  database: 'divvi',
  authentication: {
      type: 'default',
      options: {
          userName: '', // update me
          password: '' // update me
      }
  },
  options: {
      database: 'divvi'
  }
}

module.exports = config;