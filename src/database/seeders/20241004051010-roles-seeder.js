'use strict'
const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Roles to be created
    const roles = [
      {
        name: 'ADMIN',
        description: 'Administrator role with full permissions',
        default: false,
      },
      {
        name: 'USER',
        description: 'Regular user with limited permissions',
        default: true,
      },
    ]

    for (const role of roles) {
      // Check if the role already exists by querying its 'name' and selecting 'id'
      const roleExists = await queryInterface.rawSelect(
        'roles',
        {
          where: {
            name: role.name,
          },
          attributes: ['id'], // Explicitly select the 'id' attribute
        },
        [],
      )

      // Insert the role if it doesn't exist
      if (!roleExists) {
        await queryInterface.bulkInsert('roles', [
          {
            uuid: uuidv4(),
            name: role.name,
            description: role.description,
            default: role.default,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ])
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the roles by their names during rollback
    await queryInterface.bulkDelete('roles', {
      name: ['ADMIN', 'USER'],
    })
  },
}
