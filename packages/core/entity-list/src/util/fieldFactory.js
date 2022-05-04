import PropTypes from 'prop-types'
import {useMemo} from 'react'
import {formData, field, formField} from 'tocco-app-extensions'
import {js} from 'tocco-util'

import LazyDataEnhancer from '../components/LazyDataEnhancer'
import {StyledSpan} from './StyledComponents'

const FieldProvider = ({value, type, formData, formField}) => {
  const modelField = {
    targetEntity: value && js.getOrFirst(value).model
  }

  const Field = useMemo(() => field.factory('list', type), [type])

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

FieldProvider.propTypes = {
  value: PropTypes.any,
  type: PropTypes.string.isRequired,
  formData: PropTypes.shape({
    navigationStrategy: PropTypes.object
  }),
  intl: PropTypes.object.isRequired,
  formField: PropTypes.object.isRequired
}

const fieldFactory = (fieldDefinition, entity, intl) => {
  const {id, path, dataType} = fieldDefinition
  const pathValue = entity[path]
  const values = formField.isMultipleFields(pathValue, dataType) ? pathValue : [pathValue]

  const componentConfig = field.formattedComponentConfigs[dataType]
  const dataContainerProps =
    componentConfig && componentConfig.dataContainerProps
      ? componentConfig.dataContainerProps({formField: fieldDefinition})
      : {}

  const formDataContainer = values
    .map((v, idx) => (
      <formData.FormDataContainer
        key={`formDataContainer-${entity.__key}-${path}-${idx}`}
        {...dataContainerProps}
        navigationStrategy={true}
      >
        <FieldProvider type={dataType} value={v} intl={intl} formField={fieldDefinition} />
      </formData.FormDataContainer>
    ))
    .reduce(
      (acc, curr, idx) => [
        ...acc,
        ...(acc.length > 0 ? [<formField.MultipleFieldsSeparator key={`sep${idx}`} />] : []),
        curr
      ],
      []
    )

  return <StyledSpan key={id}>{formDataContainer}</StyledSpan>
}

export default fieldFactory
