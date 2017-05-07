'use strict';
var moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  var satEvent = sequelize.define('satEvent', {
    name: DataTypes.STRING,
    organization: DataTypes.STRING,
    event_date: {
      type: DataTypes.DATEONLY,
      get: function() {
        return moment.utc(this.getDataValue('event_date')).format('YYYY-MM-DD');
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      freezeTableName: true,
      tableName: 'satEvent'
    }
  });
  return satEvent;
};