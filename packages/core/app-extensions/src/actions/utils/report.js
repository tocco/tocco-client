import _reduce from 'lodash/reduce'
import PropTypes from 'prop-types'

const GROUP_GENERAL = 'generalSettings'
const GROUP_RECIPIENT = 'recipientSettings'

export const submitActions = Object.freeze({
  DISPLAY: 'display',
  DOWNLOAD: 'download'
})

export const getGroupedValues = (settingsDefinition, values) => {
  const groupValues = name => ({
    [name]: (settingsDefinition[name] || []).reduce((result, field) => ({...result, [field.id]: values[field.id]}), {})
  })

  return {
    ...groupValues(GROUP_GENERAL),
    ...groupValues(GROUP_RECIPIENT)
  }
}

export const transformValues = values => {
  const transform = v => {
    return v.key ? v.key : v
  }

  return _reduce(
    values,
    (result, value, key) => ({
      ...result,
      [key]: Array.isArray(value) ? value.map(transform) : transform(value)
    }),
    {}
  )
}

export const getFormDefinition = (settingsDefinition, intl) => {
  const msg = id => intl.formatMessage({id})

  const extractFields = name =>
    (settingsDefinition[name] || []).map(field => ({
      children: [
        {
          componentType: 'field',
          dataType: field.dataType,
          defaultValue: field.defaultValue,
          id: field.id,
          label: field.label || field.description,
          path: field.id,
          ...(field.targetEntity ? {targetEntity: field.targetEntity} : {}),
          ...(field.validation ? {validation: field.validation} : {})
        }
      ],
      componentType: 'field-set',
      hidden: false,
      id: field.id,
      label: field.label || field.description,
      readonly: field.disabled,
      scopes: []
    }))

  return {
    componentType: 'form',
    label: null,
    modelid: 'Bill_report_settings',
    readonly: false,
    children: [
      {
        componentType: 'layout',
        id: 'generalSettings',
        label: msg('client.common.report.generalSettings'),
        layoutType: 'vertical-box',
        children: extractFields(GROUP_GENERAL)
      },
      {
        componentType: 'layout',
        id: 'recipientSettings',
        label: msg('client.common.report.recipientSettings'),
        layoutType: 'vertical-box',
        children: extractFields(GROUP_RECIPIENT)
      }
    ]
  }
}

export const reportSettingsDefinitionPropType = PropTypes.shape({
  customSettings: PropTypes.shape({
    form: PropTypes.object,
    entity: PropTypes.object
  }),
  generalSettings: PropTypes.array,
  recipient: PropTypes.array,
  description: PropTypes.shape({
    name: PropTypes.string.isRequired
  })
})
