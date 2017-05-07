'use strict';
module.exports = function(sequelize, DataTypes) {
  var classes = sequelize.define('classes', {
    class_id: DataTypes.STRING,
    day: DataTypes.STRING,
    time: DataTypes.STRING,
    scu: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        classes.belongsTo(models.course, {
            as: 'classes',
            foreignKey: 'course_id',
            onDelete: 'CASCADE',
          });
        },
      
      //Table configs
      freezeTableName: true,
      tableName: 'classes'
    }
  });
  return classes;
};