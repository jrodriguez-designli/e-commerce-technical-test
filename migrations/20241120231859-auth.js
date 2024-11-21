'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('auth', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.STRING,
        unique: true,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      hashedPassword: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    // Create indices
    await queryInterface.addIndex('auth', ['uuid'], {
      unique: true,
      name: 'auth_uuid_unique',
    });

    await queryInterface.addIndex('auth', ['userId'], {
      unique: true,
      name: 'auth_user_id_unique',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('auth');
  },
};