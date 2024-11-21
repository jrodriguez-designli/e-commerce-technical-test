'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
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
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products', // Reference to the `products` table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      productQuantity: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      totalChargesAmount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('COMPLETED', 'PENDING', 'FAILED'), // Sequelize will handle the ENUM creation
        allowNull: false,
      },
      profile_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'profiles', // Reference to the `profiles` table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orders');

    // Check and drop ENUM type if it exists
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_orders_status";');
  },
};