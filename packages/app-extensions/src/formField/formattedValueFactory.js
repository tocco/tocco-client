import React from 'react'
import {FormattedValue} from 'tocco-ui'

const getOptions = (type, modelField, formData) => {
  switch (type) {
    case 'remote':
    case 'multi-remote': {
      return {
        linkFactory: (key, children) =>
          formData.linkFactory.detail(modelField.targetEntity, modelField.relationName, key, children)
      }
    }
  }

  return {}
}

export default type => (formField, modelField, formName, value, info, events, formData) => {
  const options = getOptions(type, modelField, formData)
  return <FormattedValue type={type} value={value} options={options}/>
}
