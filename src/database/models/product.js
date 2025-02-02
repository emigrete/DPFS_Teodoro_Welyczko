'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    image: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    colorId: DataTypes.INTEGER
  }, {});

  Product.associate = function(models) {
    Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    Product.belongsTo(models.Brand, { foreignKey: 'brandId', as: 'brand' });
    Product.belongsTo(models.Color, { foreignKey: 'colorId', as: 'color' });
    Product.hasMany(models.CartItem, { foreignKey: 'productId', as: 'cartItems' });
  };

  return Product;
};
