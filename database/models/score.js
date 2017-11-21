'use strict';
module.exports = function(sequelize, DataTypes) {
  var score = sequelize.define('score', {
    grades: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
          // associations can be defined here
        score.belongsTo(models.Student, {
            as: 'score',
            foreignKey: 'student_id',
            onDelete: 'CASCADE',
        });
        score.belongsTo(models.course, {
            as: 'score',
            foreignKey: 'course_id',
            onDelete: 'CASCADE',
        });
      },
      freezeTableName: true,
      tableName: 'score'
    }
  });
  return score;
};