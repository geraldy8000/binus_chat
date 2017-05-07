'use strict';
module.exports = function(sequelize, DataTypes) {
  var CommunityServiceEvents = sequelize.define('CommunityServiceEvent', {
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
      },

      //Table configs
      freezeTableName: true,
      tableName: 'community_service_event'
    }
  });
  return CommunityServiceEvents;
};