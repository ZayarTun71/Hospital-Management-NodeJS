module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("admins", [
      {
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("admins", null, {});
  },
};
