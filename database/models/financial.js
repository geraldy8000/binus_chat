'use strict';
module.exports = function(sequelize, DataTypes) {
  var financial = sequelize.define('financial', {
    item: DataTypes.STRING,
    term: DataTypes.STRING,
    due_date: DataTypes.DATEONLY,
    charge: {
      defaultValue: 0,
      type: DataTypes.INTEGER,
    },
    payment: {
      defaultValue: 0,
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        financial.belongsTo(models.Student, {
            as: 'financial',
            foreignKey: 'student_id',
            onDelete: 'CASCADE',
        });
      },

      //Table configs
      freezeTableName: true,
      tableName: 'financial'
    }
  });
  return financial;
};