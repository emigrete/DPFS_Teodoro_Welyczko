'use strict';

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('categories', [
      { name: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Clothing', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Home & Kitchen', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
