'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    originalPrice: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    discountedPrice: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    image: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    colorId: DataTypes.INTEGER,
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    isDiscounted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });

  Product.associate = function(models) {
    Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    Product.belongsTo(models.Brand, { foreignKey: 'brandId', as: 'brand' });
    Product.belongsTo(models.Color, { foreignKey: 'colorId', as: 'color' });
    Product.hasMany(models.CartItem, { foreignKey: 'productId', as: 'cartItems' });
  };

  return Product;
};