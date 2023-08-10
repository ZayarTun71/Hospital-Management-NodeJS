module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        name: "John",
        email: "john@example.com",
        password:
          "$2b$10$eixc9e0tDiwGnqIZNNohh.z8rN6jALRkdMibtMMwd8GXnmQWhQBiW",
        address: "Yangon",
        date_of_birth: "2001-02-26",
        gender: "M",
        phone: "09445540073",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
