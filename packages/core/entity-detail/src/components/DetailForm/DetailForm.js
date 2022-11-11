import PropTypes from 'prop-types'
import {useEffect, useMemo, useRef} from 'react'
import {reduxForm} from 'redux-form'
import {form} from 'tocco-app-extensions'
import {react as customHooks, env} from 'tocco-util'

import DetailFooterContainer from '../../containers/DetailFooterContainer'
import SubGrid from '../../util/detailView/fromFieldFactories/subGrid'
import {SaveButton, MarkButton} from '../Actions'
import {StyledForm} from './StyledComponents'

const DetailForm = props => {
  const {
    fireTouched,
    dirty,
    intl,
    submitting,
    mode,
    formErrors,
    valid,
    submitForm,
    entity,
    formDefinition,
    formValues,
    anyTouched,
    form: formName,
    customRenderedActions
  } = props

  const formEl = useRef(null)

  customHooks.useAutofocus(formEl)
  const formEventProps = form.hooks.useFormEvents({submitForm})

  useEffect(() => {
    fireTouched(dirty && anyTouched)
  }, [dirty, anyTouched, fireTouched])

  const allCustomRenderedActions = useMemo(
    () => ({
      save: actionDefinition => (
        <SaveButton
          intl={intl}
          submitting={submitting}
          mode={mode}
          hasErrors={!valid && anyTouched}
          formErrors={formErrors}
          {...actionDefinition}
        />
      ),
      mark: actionDefinition => <MarkButton {...actionDefinition} />,
      ...customRenderedActions
    }),
    [submitting, mode, valid, anyTouched, formErrors, intl, customRenderedActions]
  )

  const embedType = env.getEmbedType()

  return (
    <StyledForm {...formEventProps} ref={formEl}>
      <form.FormBuilder
        entity={entity}
        formName={formName}
        formDefinition={formDefinition}
        formValues={formValues}
        fieldMappingType={formDefinition.readOnly ? 'readonly' : 'editable'}
        mode={mode}
        componentMapping={{[form.componentTypes.SUB_TABLE]: SubGrid}}
        customRenderedActions={allCustomRenderedActions}
      />
      {embedType === 'admin' && <DetailFooterContainer />}
    </StyledForm>
  )
}

DetailForm.propTypes = {
  intl: PropTypes.object.isRequired,
  mode: PropTypes.oneOf(['update', 'create']),
  submitForm: PropTypes.func.isRequired,
  formDefinition: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
  form: PropTypes.string.isRequired,
  touch: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  submitting: PropTypes.bool,
  formErrors: PropTypes.object,
  valid: PropTypes.bool,
  dirty: PropTypes.bool,
  lastSave: PropTypes.number,
  fireTouched: PropTypes.func.isRequired,
  anyTouched: PropTypes.bool,
  customRenderedActions: PropTypes.objectOf(PropTypes.func)
}

export default reduxForm({
  form: 'detailForm',
  destroyOnUnmount: false
})(DetailForm)
