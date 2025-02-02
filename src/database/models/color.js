'use strict';
module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define('Color', {
    name: DataTypes.STRING
  }, {});

  Color.associate = function(models) {
    Color.hasMany(models.Product, { foreignKey: 'colorId', as: 'products' });
  };

  return Color;
};
