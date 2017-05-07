'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('course', {
      //id: {
      //  allowNull: false,
      //  autoIncrement: true,
      //  primaryKey: true,
      //  type: Sequelize.INTEGER
      //},
      course_id: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
      },
      course_name: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('course');
  }
};