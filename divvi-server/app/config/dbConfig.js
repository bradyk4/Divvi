// parameters for database connection
module.exports = {
  host: 'divvi.database.windows.net',
  dialect: 'mssql',
  driver: 'tedious',
  user: 'bradyk4',
  password: 'Pa$$w0rd',
  db: 'divvi',
  options: {
    encrypt: true,
    database: 'Divvi',
  },
  dialectOptions: {
      encrypt: true,
  },
  // prevent adding unused fields included by default in sequelize
    // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,
    // If don't want createdAt
  createdAt: false,
    // If don't want updatedAt
  updatedAt: false,

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
};