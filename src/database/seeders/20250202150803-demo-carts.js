'use strict';

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('carts', [
      { userId: 2, total_price: 1899.98, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('carts', null, {});
  }
};
