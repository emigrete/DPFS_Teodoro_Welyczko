'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('Users', null, {}); 
    await queryInterface.sequelize.query('ALTER TABLE Users AUTO_INCREMENT = 1');

    return queryInterface.bulkInsert('Users', [
      {
        firstName: "Admin",
        lastName: "ETECH",
        email: "admin@etech.com",
        password: bcrypt.hashSync("admin123", 10),
        role: "admin",
        image: "admin.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Teodoro",
        lastName: "Gamer",
        email: "teo@etech.com",
        password: bcrypt.hashSync("teogamer123", 10),
        role: "user",
        image: "teodoro.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
