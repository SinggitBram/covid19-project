'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate:
      {
        notEmpty: {
          msg: 'Please input your email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:
      {
        notEmpty: {
          msg: 'Please input your password'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance, option) => {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash
      }
    }, sequelize
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};