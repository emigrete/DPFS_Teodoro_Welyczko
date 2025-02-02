'use strict';

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('brands', [
      { name: 'Samsung', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Apple', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Nike', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('brands', null, {});
  }
};
