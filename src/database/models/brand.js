'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
    name: DataTypes.STRING
  }, {});

  Brand.associate = function(models) {
    Brand.hasMany(models.Product, { foreignKey: 'brandId', as: 'products' });
  };

  return Brand;
};
