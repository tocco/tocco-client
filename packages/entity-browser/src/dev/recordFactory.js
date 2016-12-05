const getRandomDate = (startYear, endYear) => {
  var start = new Date(startYear, 1, 1)
  var end = new Date(endYear, 1, 1)

  var date = new Date(+start + Math.random() * (end - start));
  return date;
}

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
          value: 'Firstname ' + i,
          type: 'string'
        },
        lastname: {
          value: 'Lastname ' + (amount - i),
          type: 'string'
        },
        birthdate: {
          value: getRandomDate(1980, 2010),
          type: 'birthdate'
        },
        salary: {
          value: 1000 + i*2.1,
          type: 'moneyamount'
        }
      }
    })
  }
  return records
}
