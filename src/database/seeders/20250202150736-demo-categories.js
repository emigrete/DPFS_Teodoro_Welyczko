'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('Categories', null, {}); 
    await queryInterface.sequelize.query('ALTER TABLE Categories AUTO_INCREMENT = 1');

    return queryInterface.bulkInsert('Categories', [
      { name: 'Periféricos', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Consolas', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Componentes', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Juegos Digitales', createdAt: new Date(), updatedAt: new Date() },
      { name: 'PCs Gamer', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Accesorios', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
