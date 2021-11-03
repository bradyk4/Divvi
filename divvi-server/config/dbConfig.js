// parameters for database connection
module.exports = {
  host: 'divvi.database.windows.net',
  user: 'bradyk4',
  password: 'Pa$$w0rd',
  database: 'divvi',
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  driver: 'tedious',
  dialectOptions: {
      encrypt: true,
      database: 'divvi',
  },
};