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

export default type => (formField, modelField, formName, value, info, events, formData, key) => {
  const options = getOptions(type, modelField, formData)
  return <FormattedValue key={key} type={type} value={value} options={options}/>
}
