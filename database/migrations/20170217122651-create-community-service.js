'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('community_service', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      period: {
        type: Sequelize.INTEGER,
      },
      activity_name: {
        type: Sequelize.STRING,
      },
      project_name: {
        type: Sequelize.STRING,
      },
      hours: {
        type: Sequelize.INTEGER,
      },
      points: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('community_service');
  }
};