const { readFile } = require('fs/promises')

const createSchemaCustomization = async ({ actions: { createTypes } }) => {
  createTypes(await readFile(`${ __dirname }/types.gql`, 'utf8'))
}

module.exports = createSchemaCustomization
