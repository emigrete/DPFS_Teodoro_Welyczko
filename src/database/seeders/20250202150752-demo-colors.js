'use strict';

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('colors', [
      { name: 'Red', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Blue', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Black', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('colors', null, {});
  }
};
