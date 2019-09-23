module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Bruno',
      lastName: 'Doe',
      email: 'john@doe.com',
      password: '123456789',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Emre',
      lastName: 'Smith',
      email: 'john@smith.com',
      password: '123456789',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'John',
      lastName: 'Stone',
      email: 'john@stone.com',
      password: '123456789',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};