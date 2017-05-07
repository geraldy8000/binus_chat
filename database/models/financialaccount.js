'use strict';
module.exports = function(sequelize, DataTypes) {
  var financialAccount = sequelize.define('financialAccount', {
    virtual_account: DataTypes.STRING,
    bank_account: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        financialAccount.belongsTo(models.Student, {
            as: 'financialAccount',
            foreignKey: 'student_id',
            onDelete: 'CASCADE',
        });
      },

      //Table configs
      freezeTableName: true,
      tableName: 'financialAccount'
      
    }
  });
  return financialAccount;
};