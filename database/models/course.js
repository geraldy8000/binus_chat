'use strict';
module.exports = function(sequelize, DataTypes) {
  var course = sequelize.define('course', {
    course_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    course_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      freezeTableName: true,
      tableName: 'course'
    }
  });
  return course;
};