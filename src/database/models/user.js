'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    role: { type: DataTypes.ENUM('admin', 'user'), defaultValue: 'user' },
    image: DataTypes.STRING
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Cart, { foreignKey: 'userId', as: 'carts' });
  };

  return User;
};
