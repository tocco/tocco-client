/* eslint-disable no-console */
const fetch = require('isomorphic-fetch')

const getPrimaryKeyFromLocation = location => location.substring(location.lastIndexOf('/') + 1)

const getHeaders = config => {
  const headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Authorization', 'Basic ' + Buffer.from(config.env.USER + ':' + config.env.API_KEY).toString('base64'))

  return headers
}

const addEntity = async (config, entity, data) => {
  const body = JSON.stringify(data)
  const options = {
    method: 'POST',
    body,
    headers: getHeaders(config)
  }

  console.log(`add entity '${entity}'`, body)

  const response = await fetch(`${config.baseUrl}/nice2/rest/entities/2.0/${entity}`, options)
  const location = response.headers.get('location')
  if (response.status >= 400) {
    console.error(`cannot add entity '${entity}':`, response.status)
    throw new Error(`cannot add entity '${entity}', ${response.status}`)
  }
  console.log(`added entity '${entity}'`, response.status)

  return {response, pk: getPrimaryKeyFromLocation(location)}
}

/**
 * Adds new widget-configuration via REST API.
 * @param {object} config Cypress config
 * @param {string} label Widget label and abbreviation
 * @param {object} widget `relWidget` data (see: http://localhost:8080/tocco/e/Widget/list)
 * @param {object} data Data of the specific widget config
 * @returns widgetConfig
 */
const addWidget = async (config, label, widget, data) => {
  const widgetConfig = await addEntity(config, 'Widget_config', {
    model: 'Widget_config',
    paths: {
      abbreviation: label,
      label,
      relWidget: widget,
      domain: 'localhost',
      relCorrespondence_language: {key: '3', version: 1}
    }
  })

  const {pk: specificWidgetConfigPK} = await addEntity(config, data.model, data)

  const options = {
    method: 'PUT',
    body: JSON.stringify({entityName: data.model, key: specificWidgetConfigPK}),
    headers: getHeaders(config)
  }

  await fetch(`${config.baseUrl}/nice2/rest/widget/configs/${widgetConfig.pk}/specific-config`, options)

  return widgetConfig
}

const addEntityBrowserWidget = async (config, label) => {
  return addWidget(
    config,
    label,
    {key: '3', version: 1}, // Entity-Browser Widget is not available anymore
    {
      model: 'Entity_browser_widget_config',
      paths: {system_entity: false, entity_name: 'User'}
    }
  )
}

const addLoginWidget = async (config, label) => {
  return addWidget(
    config,
    label,
    {key: '1', version: 1},
    {
      model: 'Login_widget_config',
      paths: {
        relBusiness_unit: {key: 2, version: 1},
        redirect_url: 'http://localhost:3000/'
      }
    }
  )
}

module.exports = {
  addEntity,
  addEntityBrowserWidget,
  addLoginWidget
}
