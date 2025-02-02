'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: false },
      price: { type: Sequelize.DECIMAL(10,2), allowNull: false },
      image: { type: Sequelize.STRING(255), allowNull: true },
      categoryId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'categories', key: 'id' }, onDelete: 'CASCADE' },
      brandId: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'brands', key: 'id' }, onDelete: 'SET NULL' },
      colorId: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'colors', key: 'id' }, onDelete: 'SET NULL' },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('products');
  }
};
