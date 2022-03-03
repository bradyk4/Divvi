module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("Transaction", {
      // Model attributes are defined here
      userName: {
        type: Sequelize.STRING
      },
      expenseName: {
        type: Sequelize.STRING
      },
      expenseDesc: {
        type: Sequelize.STRING
      },
      amountOwed: {
        type: Sequelize.DECIMAL(10, 2)
      },
      userID: {
        type: Sequelize.INTEGER,
      },
      transactionID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        isInt: {
          msg: "Must be an integer between (1 & 1000)"
        }
      },
      creatorID: {
        type: Sequelize.INTEGER,
      },
      isAmountPaid: {
          type: Sequelize.BOOLEAN
      }
    },{
      timestamps: false,
      updatedAt: false,
      createdAt: false,
      }
    );
  
    return Transaction;
  }