'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('cart_items', null, {}); 
    await queryInterface.sequelize.query('ALTER TABLE cart_items AUTO_INCREMENT = 1');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    return queryInterface.bulkInsert('cart_items', [
      { cartId: 1, productId: 1, quantity: 1, price: 129.99, createdAt: new Date(), updatedAt: new Date() },
      { cartId: 1, productId: 2, quantity: 1, price: 499.99, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('cart_items', null, {});
  }
};
