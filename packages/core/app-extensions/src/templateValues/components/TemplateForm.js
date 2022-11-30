import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {reduxForm} from 'redux-form'

import form from '../../form'
import selectionPropType from '../../selection'
import TemplateSelect from './TemplateSelectContainer'

export const REDUX_FORM_NAME = 'template'

const TemplateForm = ({
  templateEntityName,
  formName,
  formDefinition,
  initializeTemplates,
  customTemplateFields = {},
  defaultValues = {},
  selection
}) => {
  // run only once on mount
  useEffect(() => {
    initializeTemplates(templateEntityName, formName, selection, customTemplateFields, defaultValues)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (formDefinition) {
    return (
      <>
        <TemplateSelect templateEntityName={templateEntityName} customTemplateFields={customTemplateFields} />

        <form.FormBuilder
          entity={undefined}
          formName={formName}
          formDefinition={formDefinition}
          fieldMappingType={'editable'}
          mode={'create'}
        />
      </>
    )
  } else {
    return null
  }
}

TemplateForm.propTypes = {
  templateEntityName: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  formDefinition: PropTypes.object,
  initializeTemplates: PropTypes.func.isRequired,
  customTemplateFields: PropTypes.objectOf(PropTypes.func),
  defaultValues: PropTypes.object,
  selection: selectionPropType.propType
}

export default reduxForm({form: REDUX_FORM_NAME, destroyOnUnmount: false})(TemplateForm)
