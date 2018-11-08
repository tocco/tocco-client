import React from 'react'
import {FormattedValue} from 'tocco-ui'

const customTypeMap = {
  'document': 'document-compact',
  'binary': 'document-compact'
}

const getOptions = (type, intl) => {
  switch (type) {
    case 'document-compact':
      return {
        downloadTitle: intl.formatMessage({id: 'client.component.upload.downloadTitle'})
      }
  }

  return null
}

const formattedValueCustomTypeMapper = type => customTypeMap[type] ? customTypeMap[type] : type

export const MultiSeparator = () => ', '

export default (fieldDefinition, entity, intl) => {
  const {id} = fieldDefinition
  const contents = Array.isArray(entity[id]) ? entity[id] : [entity[id]]

  return contents.length > 0
    ? <span key={id} style={{marginRight: '2px'}}>
      {
        contents
          .map((content, idx) => {
            const {type, value} = content
            const mappedType = formattedValueCustomTypeMapper(type)
            const options = getOptions(mappedType, intl)
            return <FormattedValue key={idx} type={mappedType} value={value} {...(options ? {options} : {})}/>
          })
          .reduce((prev, curr, idx) => [prev, <MultiSeparator key={idx}/>, curr])
      }
    </span>
    : null
}
