module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define("CartItem", {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      cartId: {  // ✅ Asegurar que usa "cartId" en vez de "cart_id"
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: "Carts",
              key: "id"
          }
      },
      productId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: "Products",
              key: "id"
          }
      },
      quantity: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      price: {
          type: DataTypes.DECIMAL(10,2),
          allowNull: false
      }
  }, {
      tableName: "cart_items",
      timestamps: true,
      underscored: false // 🔹 Evita que Sequelize convierta cartId en cart_id
  });

  CartItem.associate = (models) => {
      CartItem.belongsTo(models.Cart, { foreignKey: "cartId", as: "cart" });
      CartItem.belongsTo(models.Product, { foreignKey: "productId", as: "product" });
  };

  return CartItem;
};
