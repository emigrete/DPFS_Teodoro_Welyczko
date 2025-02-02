'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('Colors', null, {}); 
    await queryInterface.sequelize.query('ALTER TABLE Colors AUTO_INCREMENT = 1');

    return queryInterface.bulkInsert('Colors', [
      { name: 'Negro', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Blanco', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Rojo', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Azul', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Verde', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Colors', null, {});
  }
};
