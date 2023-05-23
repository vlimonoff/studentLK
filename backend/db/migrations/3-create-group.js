module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      groupName: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      kurs: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      programmId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Programms',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Groups');
  },
};
