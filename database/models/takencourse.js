'use strict';
module.exports = function(sequelize, DataTypes) {
  var takenCourse = sequelize.define('takenCourse', {
    class_id: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
          // associations can be defined here
        takenCourse.belongsTo(models.Student, {
            as: 'takenCourse',
            foreignKey: 'student_id',
            onDelete: 'CASCADE',
        });
        takenCourse.belongsTo(models.course, {
            as: 'takenCourse',
            foreignKey: 'course_id',
            onDelete: 'CASCADE',
        });
      },
      freezeTableName: true,
      tableName: 'takenCourse'
    }
  });
  return takenCourse;
};