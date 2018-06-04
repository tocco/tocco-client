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

export default (field, entity, intl) => {
  const {id} = field
  const {type, value} = entity[id]

  const mappedType = formattedValueCustomTypeMapper(type)
  const options = getOptions(mappedType, intl)

  return (<span key={id} style={{marginRight: '2px'}}>
    <FormattedValue type={mappedType} value={value} {...(options ? {options} : {})}/>
  </span>)
}
