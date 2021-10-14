import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'tocco-ui'
import {formData, field} from 'tocco-app-extensions'
import {js} from 'tocco-util'

import {StyledSpan} from './StyledComponents'
import LazyDataEnhancer from '../components/LazyDataEnhancer'

export const MultiSeparator = () => (<Typography.Span>, </Typography.Span>)

const multiTypes = ['multi-select-box', 'multi-remote-field']

export default (fieldDefinition, entity, intl) => {
  const {
    id,
    path,
    dataType
  } = fieldDefinition
  const isMultiType = multiTypes.includes(dataType)
  const pathValue = entity[path]
  const values = !isMultiType && Array.isArray(pathValue) ? pathValue : [pathValue]
  const formDataContainer = values.map((v, idx) =>
    <formData.FormDataContainer key={`formDataContainer-${entity.__key}-${path}-${idx}`} navigationStrategy={true}>
      <FormattedValueWrapper type={dataType} value={v} intl={intl} formField={fieldDefinition}/>
    </formData.FormDataContainer>
  ).reduce((prev, curr, idx) => [prev, <MultiSeparator key={'sep' + idx}/>, curr])

  return (
    <StyledSpan key={id}>
      {formDataContainer}
    </StyledSpan>
  )
}

const FormattedValueWrapper = ({
  value,
  type,
  formData,
  intl,
  formField
}) => {
  const modelField = {
    targetEntity: value && js.getOrFirst(value).model
  }

  const Field = useMemo(() => field.factory('list', type), [])

  return (
    <LazyDataEnhancer value={value} type={type}>
      <Field
        type={type}
        formField={formField}
        modelField={modelField}
        value={value}
        formData={formData}
        breakWords={false}
      />
    </LazyDataEnhancer>
  )
}

FormattedValueWrapper.propTypes = {
  value: PropTypes.any,
  type: PropTypes.string.isRequired,
  formData: PropTypes.shape({
    navigationStrategy: PropTypes.object
  }),
  intl: PropTypes.object.isRequired,
  formField: PropTypes.object.isRequired
}
