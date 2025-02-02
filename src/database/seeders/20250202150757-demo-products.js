'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.sequelize.query('ALTER TABLE products AUTO_INCREMENT = 1');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    return queryInterface.bulkInsert('products', [
      { 
        name: 'Teclado Razer BlackWidow',
        description: 'Teclado mecánico gamer con switches verdes.',
        price: 129.99,
        image: 'blackwidow.jpg',
        categoryId: 1,  // ✅ Debe existir en Categories
        brandId: 1,      // ✅ Debe existir en Brands
        colorId: 1,      // ✅ Debe existir en Colors
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        name: 'Consola PlayStation 5',
        description: 'Nueva generación de consolas con gráficos ultra realistas.',
        price: 499.99,
        image: 'ps5.jpg',
        categoryId: 2,  // ✅ Asegúrate de que existe en Categories
        brandId: 10,    // ✅ Asegúrate de que existe en Brands
        colorId: 2,     // ✅ Asegúrate de que existe en Colors
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('products', null, {});
  }
};
