'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('takenCourse', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      student_id:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'student',
          key:'student_id',
          as:'student_id',
        }
      },
      course_id: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'course',
          key:'course_id',
          as:'course_id',
        }
      },
      class_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      score: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },  
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('takenCourse');
  }
};