import _forOwn from 'lodash/forOwn'

const getRandomDate = (startYear, endYear) => {
  const start = new Date(startYear, 1, 1)
  const end = new Date(endYear, 1, 1)

  const date = new Date(+start + Math.random() * (end - start))

  const year = date.getFullYear()
  const month = ('00' + (date.getMonth() + 1)).slice(-2)
  const day = ('00' + date.getDate()).slice(-2)

  return `${year}-${month}-${day}`
}

const getRandomInt = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min)

export const createDummyEntities = amount => {
  const entities = []

  for (let i = 0; i < amount; i++) {
    const values = {
      label: {
        value: `Dummy Entity ${i}`,
        type: 'string',
        readable: true,
        writable: true
      },
      sorting: {
        value: i * 10,
        type: 'sorting',
        readable: true,
        writable: true
      },
      active: {
        value: (i % 2 === 0),
        type: 'boolean',
        readable: true,
        writable: true
      },
      empty: {
        value: '',
        type: 'string',
        readable: true,
        writable: true
      },
      doc: {
        value: {
          mimeType: 'image/png',
          fileExtension: 'png',
          sizeInBytes: 3336,
          fileName: 'Firstname,-Lastname-Vorschaubild.png',
          thumbnailLink: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgAQMAAADYVuV7AAAACXBIWXMAAA7EAAAOxAGV'
          + 'Kw4bAAAABlBMVEUCd72z5fwcX0uLAAAAHElEQVQ4y2NgwAns/8PBn1HOKGeUM8oZrBycAADOggXZNnQmgAAAAABJRU5ErkJggg==',
          binaryLink: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgAQMAAADYVuV7AAAACXBIWXMAAA7EAAAOxAGVKw4'
          + 'bAAAABlBMVEUCd72z5fwcX0uLAAAAHElEQVQ4y2NgwAns/8PBn1HOKGeUM8oZrBycAADOggXZNnQmgAAAAABJRU5ErkJggg=='
        },
        type: 'document',
        readable: true,
        writable: true
      }
    }

    const paths = {}
    _forOwn(values, (value, key) => {
      paths[key] = {
        type: 'field',
        value
      }
    })

    entities.push({
      key: `${i}`,
      model: 'Dummy_entity',
      version: 1,
      display: `User ${i}`,
      fields: values,
      paths
    })
  }

  return entities
}

export const createUsers = amount => {
  const entities = []
  const userTemplate = require('./data/user_template.json')

  for (let i = 0; i < amount; i++) {
    entities.push({
      ...userTemplate,
      key: `${i}`,
      display: `Dummy User ${i}`,
      paths: {
        ...userTemplate.paths,
        user_nr: {
          type: 'field',
          value: {
            type: 'counter',
            value: i,
            writable: false
          }
        },
        firstname: {
          type: 'field',
          value: {
            value: 'Firstname ' + i,
            type: 'string',
            writable: true
          }
        },
        lastname: {
          type: 'field',
          value: {
            value: 'Lastname ' + (amount - i),
            type: 'string',
            writable: true
          }
        },
        birthdate: {
          type: 'field',
          value: {
            value: getRandomDate(1980, 2010),
            type: 'birthdate',
            writable: true
          }
        },
        age: {
          type: 'field',
          value: {
            value: getRandomInt(10, 100),
            type: 'number',
            writable: true
          }
        },
        salary: {
          type: 'field',
          value: {
            value: getRandomInt(0, 10000),
            type: 'moneyamount',
            writable: true
          }
        },
        publish: {
          type: 'field',
          value: {
            value: (i % 2 === 0),
            type: 'boolean',
            writable: true
          }
        }
      }
    })
  }
  return entities
}
