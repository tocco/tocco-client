export const createUsers = amount => {
  const records = []
  const userTemplate = require('./user_template.json')

  for (let i = 0; i < amount; i++) {
    records.push({
      ...userTemplate,
      key: i,
      fields: {
        ...userTemplate.fields,
        user_nr: {
          type: 'counter',
          value: i
        },
        firstname: {
          value: 'Test' + i,
          type: 'string'
        }
      }
    }
    )
  }
  return records
}
