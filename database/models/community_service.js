'use strict';
module.exports = function(sequelize, DataTypes) {
  var CommunityService = sequelize.define('CommunityService', {
    period: DataTypes.INTEGER,
    activity_name: DataTypes.STRING,
    project_name: DataTypes.STRING,
    hours: {
      defaultValue: 0,
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        CommunityService.belongsTo(models.Student, {
            as: 'community_service',
            foreignKey: 'student_id',
            onDelete: 'CASCADE',
        });
      },

      //Table configs
      freezeTableName: true,
      tableName: 'community_service'
      }
  });
  return CommunityService;
};