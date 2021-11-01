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

async function addUser(user) {

  try {
      let pool = await sql.connect(config);
      let insertUser = await pool.request()
          .input('ID', sql.Int, user.ID)
          .input('Name', sql.NVarChar, user.Name)
          .input('Balance', sql.Money, user.Balance)
          .input('GroupId', sql.Int, user.GroupId)
          .execute('InsertUsers');
      return insertUser.recordsets;
  }
  catch (err) {
      console.log(err);
  }

}

module.exports = {
  getUsers : getUsers,
  addUser : addUser,
}