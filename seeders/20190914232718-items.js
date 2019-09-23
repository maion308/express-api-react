module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Items', [{
      title: 'Moped',
      link: 'https://detroitmopedworks.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'iPad Mini',
      link: 'https://www.apple.com/ipad-mini',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Electric Scooter',
      link: 'https://swagtron.com/electric-scooter',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Monitor',
      link: 'https://www.asus.com/us/Monitors/MB168B',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Items', null, {});
  }
};