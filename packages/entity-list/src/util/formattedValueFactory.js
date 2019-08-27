import React from 'react'
import {FormattedValue} from 'tocco-ui'
import {formData} from 'tocco-app-extensions'
const customTypeMap = {
  document: 'document-compact',
  binary: 'document-compact'
}

const getOptions = (type, value, intl, formData) => {
  switch (type) {
    case 'document-compact':
      return {
        downloadTitle: intl.formatMessage({id: 'client.component.upload.downloadTitle'})
      }
    case 'multi-remote':
    case 'remote':
      return {
        ...(formData.linkFactory && formData.linkFactory.detail
          && {linkFactory: (key, children) => formData.linkFactory.detail(value.model, null, key, children)})
      }
  }

  return null
}

const formattedValueCustomTypeMapper = type => customTypeMap[type] ? customTypeMap[type] : type

export const MultiSeparator = () => ', '

export default (fieldDefinition, entity, intl) => {
  const {id, path} = fieldDefinition
  const value = entity[path || id]
  const contents = Array.isArray(value) ? value : [value]

  return contents.length > 0
    ? <span key={id} style={{marginRight: '2px'}}>
      <formData.FormDataContainer linkFactory={true}>
        <FormDataWrapper contents={contents} intl={intl}/>
      </formData.FormDataContainer>
    </span>
    : null
}

const FormDataWrapper = ({contents, formData, intl}) => {
  return contents
    .map((content, idx) => {
      const {type, value} = content
      const mappedType = formattedValueCustomTypeMapper(type)
      const options = getOptions(mappedType, value, intl, formData)
      return (
        <span key={idx} onClick={e => e.stopPropagation()}>
          <FormattedValue type={mappedType} value={value} {...(options ? {options} : {})}/>
        </span>
      )
    })
    .reduce((prev, curr, idx) => [prev, <MultiSeparator key={`ms-${idx}`}/>, curr])
}
