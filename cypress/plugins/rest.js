const fetch = require('isomorphic-fetch')

const addEntity = (config, entity, data) => {
  const headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Authorization', 'Basic ' + Buffer.from(config.env.USER + ':' + config.env.API_KEY).toString('base64'))

  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers
  }

  return fetch(`${config.baseUrl}/nice2/rest/entities/2.0/${entity}`, options)
}

module.exports = {
  addEntity
}
