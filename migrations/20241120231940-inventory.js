'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('inventory', {
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
      stock: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      stockMeasure: {
        type: Sequelize.ENUM('UNITS', 'KILOGRAMS', 'LITERS', 'METERS', 'GRAMS', 'PIECES', 'BOXES'),
        allowNull: false,
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
    await queryInterface.dropTable('inventory');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_inventory_stock_measure";');
  },
};