import React from 'react'
import {FormattedValue} from 'tocco-ui'

const getOptions = (type, modelField, formData) => {
  switch (type) {
    case 'remote':
    case 'multi-remote': {
      if (formData.linkFactory) {
        return {
          linkFactory: (key, children) =>
            formData.linkFactory.detail(modelField.targetEntity, modelField.relationName, key, children)
        }
      }
    }
  }

  return {}
}

const typeMapping = {
  'binary': 'document-compact',
  'display': 'html',
  'document': 'document-compact',
  'image': 'document-compact',
  'multi-remote-field': 'multi-remote',
  'single-remote-field': 'remote',
  'single-select-box': 'single-select',
  'multi-select-box': 'multi-select'
}

export default type => (formField, modelField, formName, value, info, events, formData, key) => {
  const options = getOptions(type, modelField, formData)
  const dataType = typeMapping[type] ? typeMapping[type] : type
  return <FormattedValue key={key} type={dataType} value={value} options={options}/>
}
