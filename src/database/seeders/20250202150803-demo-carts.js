'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('Carts', null, {}); 
    await queryInterface.sequelize.query('ALTER TABLE Carts AUTO_INCREMENT = 1');

    return queryInterface.bulkInsert('Carts', [
      { userId: 1, total_price: 629.98, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Carts', null, {});
  }
};
