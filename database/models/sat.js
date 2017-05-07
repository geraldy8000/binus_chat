'use strict';
module.exports = function(sequelize, DataTypes) {
  var sat = sequelize.define('sat', {
    title: DataTypes.STRING,
    organization: DataTypes.STRING,
    level: DataTypes.STRING,
    points: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        sat.belongsTo(models.Student, {
            as: 'sat',
            foreignKey: 'student_id',
            onDelete: 'CASCADE',
        });
      },

      //Table configs
      freezeTableName: true,
      tableName: 'sat'
    }
  });
  return sat;
};