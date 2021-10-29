var config = require('./dbConfig')
const sql = require('mssql')


async function getUsers() {
  try{
    let pool = await sql.connect(config);
    let users = await pool.request().query("SELECT * FROM dbo.[User]");
    return users.recordsets;
  }
  catch(error) {
    console.log(error);
  }
}

module.exports = {
  getUsers : getUsers
}