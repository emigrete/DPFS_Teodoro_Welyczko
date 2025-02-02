'use strict';

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('cart_items', [
      { cartId: 1, productId: 1, quantity: 1, price: 999.99, createdAt: new Date(), updatedAt: new Date() },
      { cartId: 1, productId: 2, quantity: 1, price: 899.99, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('cart_items', null, {});
  }
};
