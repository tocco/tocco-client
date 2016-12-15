const getRandomDate = (startYear, endYear) => {
  const start = new Date(startYear, 1, 1)
  const end = new Date(endYear, 1, 1)

  return new Date(+start + Math.random() * (end - start))
}

export const createUsers = amount => {
  const records = []
  const userTemplate = require('./user_template.json')

  for (let i = 0; i < amount; i++) {
    records.push({
      ...userTemplate,
      key: i,
      paths: {
        ...userTemplate.paths,
        user_nr: {
          type: 'field',
          value: {
            type: 'counter',
            value: i
          }
        },
        firstname: {
          type: 'field',
          value: {
            value: 'Firstname ' + i,
            type: 'string'
          }
        },
        lastname: {
          type: 'field',
          value: {
            value: 'Lastname ' + (amount - i),
            type: 'string'
          }
        },
        birthdate: {
          type: 'field',
          value: {
            value: getRandomDate(1980, 2010),
            type: 'birthdate'
          }
        },
        salary: {
          type: 'field',
          value: {
            value: 1000 + i * 2.1,
            type: 'moneyamount'
          }
        },
        publish: {
          type: 'field',
          value: {
            value: (i % 2 === 0),
            type: 'boolean'
          }
        }
      }
    })
  }
  return records
}
