'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('Brands', null, {}); 
    await queryInterface.sequelize.query('ALTER TABLE Brands AUTO_INCREMENT = 1');

    return queryInterface.bulkInsert('Brands', [
      { name: 'Razer', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Corsair', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Logitech', createdAt: new Date(), updatedAt: new Date() },
      { name: 'MSI', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Asus ROG', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Gigabyte', createdAt: new Date(), updatedAt: new Date() },
      { name: 'SteelSeries', createdAt: new Date(), updatedAt: new Date() },
      { name: 'HyperX', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Alienware', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sony PlayStation', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Microsoft Xbox', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Nintendo', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Brands', null, {});
  }
};
