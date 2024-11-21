'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    // Define roles to be added
    const roles = [
      {
        uuid: uuidv4(),
        name: 'ADMIN',
        description: 'Administrator role with full permissions',
        is_default: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uuid: uuidv4(),
        name: 'USER',
        description: 'Regular user with limited permissions',
        is_default: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Fetch existing roles by name
    const existingRoles = await queryInterface.sequelize.query(
      `SELECT name FROM roles WHERE name IN (:names)`,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
        replacements: { names: roles.map((role) => role.name) },
      }
    );

    // Extract existing role names into an array
    const existingRoleNames = existingRoles.map((role) => role.name);

    // Filter out roles that already exist
    const rolesToInsert = roles.filter(
      (role) => !existingRoleNames.includes(role.name)
    );

    // Insert only non-existing roles
    if (rolesToInsert.length > 0) {
      await queryInterface.bulkInsert('roles', rolesToInsert);
    }
  },

  down: async (queryInterface) => {
    // Delete roles by name on rollback
    await queryInterface.bulkDelete('roles', {
      name: ['ADMIN', 'USER'],
    });
  },
};