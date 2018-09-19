import PropTypes from 'prop-types'

const GROUP_GENERAL = 'generalSettings'
const GROUP_RECIPIENT = 'recipientSettings'

export const getGroupedValues = (settingsDefinition, values) => {
  const groupValues = name => {
    return {
      [name]: (settingsDefinition[name] || []).reduce((result, field) => {
        return {...result, [field.id]: values[field.id]}
      }, {})
    }
  }

  return {
    ...groupValues(GROUP_GENERAL),
    ...groupValues(GROUP_RECIPIENT)
  }
}

export const getFormDataDefaults = settingsDefinition => {
  const extractDefaultValues = name =>
    (settingsDefinition[name] || []).reduce((result, field) => {
      return {
        ...result,
        ...(field.options ? {[field.id]: field.options} : {})
      }
    }, {})

  return {
    relationEntities: {
      ...extractDefaultValues(GROUP_GENERAL),
      ...extractDefaultValues(GROUP_RECIPIENT)
    }
  }
}

export const getModel = settingsDefinition => {
  const extractModelFields = name =>
    (settingsDefinition[name] || []).reduce((result, field) => (
      {
        ...result,
        [field.id]: {
          ...(field.targetEntity ? {targetEntity: field.targetEntity} : {}),
          ...(field.validation ? {validation: field.validation} : {})
        }
      }
    ), {})

  return {
    ...extractModelFields(GROUP_GENERAL),
    ...extractModelFields(GROUP_RECIPIENT)
  }
}

export const getFormDefinition = (settingsDefinition, intl) => {
  const msg = id => intl.formatMessage({id})

  const extractFields = name =>
    (settingsDefinition[name] || []).map(field => {
      return {
        'children': [
          {
            'componentType': 'field',
            'dataType': field.type,
            ...(field.defaultValue !== null ? {'defaultValue': field.defaultValue} : {}),
            'id': field.id,
            'label': field.label || field.description,
            'path': field.id
          }
        ],
        'componentType': 'field-set',
        'hidden': false,
        'id': field.id,
        'label': field.label || field.description,
        'readonly': field.disabled,
        'scopes': []
      }
    })

  return {
    'componentType': 'form',
    'label': null,
    'modelid': 'Bill_report_settings',
    'readonly': false,
    'children': [
      {
        'componentType': 'layout',
        'id': 'generalSettings',
        'label': msg('client.common.report.generalSettings'),
        'layoutType': 'vertical-box',
        children: extractFields(GROUP_GENERAL)
      },
      {
        'componentType': 'layout',
        'id': 'recipientSettings',
        'label': msg('client.common.report.recipientSettings'),
        'layoutType': 'vertical-box',
        children: extractFields(GROUP_RECIPIENT)
      }
    ]
  }
}

export const reportSettingsDefinitionPropType = PropTypes.shape({
  customSettings: PropTypes.shape({
    form: PropTypes.object.isRequired,
    entity: PropTypes.object.isRequired
  }),
  generalSettings: PropTypes.array,
  recipient: PropTypes.array,
  description: PropTypes.shape({
    name: PropTypes.string.isRequired
  })
})
