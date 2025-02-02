'use strict';

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('products', [
      { name: 'iPhone 13', description: 'Latest Apple smartphone', price: 999.99, image: 'iphone.jpg', categoryId: 1, brandId: 2, colorId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Samsung Galaxy S22', description: 'Newest Samsung phone', price: 899.99, image: 'galaxy.jpg', categoryId: 1, brandId: 1, colorId: 2, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('products', null, {});
  }
};
