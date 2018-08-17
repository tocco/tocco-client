import PropTypes from 'prop-types'
import React from 'react'
import {reduxForm} from 'redux-form'
import {intlShape, FormattedRelative, FormattedMessage} from 'react-intl'
import {Button, LayoutBox} from 'tocco-ui'
import {form, formField} from 'tocco-util'

import SubGrid from '../../util/detailView/fromFieldFactories/subGrid'
import ErrorBox from '../ErrorBox'
import modes from '../../util/modes'
import readOnlyFormFieldMapping from '../../util/detailView/readOnlyFormFieldMapping'

export class DetailForm extends React.Component {
  constructor(props) {
    super(props)

    this.formBuilder = this.createFormBuilder(props)
  }

  componentWillReceiveProps(nextProps) {
    this.formBuilder = this.createFormBuilder(nextProps)
    this.props.fireTouched(nextProps.anyTouched)
  }

  createFormBuilder = props => {
    const formFieldUtils = {
      relationEntities: props.relationEntities,
      loadRelationEntities: props.loadRelationEntities,
      loadTooltip: props.loadTooltip,
      tooltips: props.tooltips,
      uploadDocument: props.uploadDocument,
      intl: this.props.intl,
      openAdvancedSearch: props.openAdvancedSearch
    }

    return form.initFormBuilder(
      props.entity,
      props.entityModel,
      props.form,
      props.formDefinition,
      props.formValues,
      formFieldUtils,
      formField.defaultMapping,
      readOnlyFormFieldMapping,
      undefined,
      props.mode,
      {[form.componentTypes.SUB_TABLE]: SubGrid()}
    )
  }

  isReadOnlyForm = () => this.props.formDefinition.readonly

  isEntityLoaded = () => (this.props.entity && this.props.entity.paths)

  touchFieldsWithError = () => {
    Object.keys(form.formErrorsUtil.getFieldErrors(this.props.formErrors)).forEach(f => this.props.touch(f))
  }

  focusErrorFields = () => {
    const firstErrorField = form.formErrorsUtil.getFirstErrorField(this.props.formErrors)
    if (firstErrorField) {
      document.getElementById(form.getFieldId(this.props.form, firstErrorField)).focus()
    }
  }

  save = () => {
    if (this.props.valid) {
      this.props.submitForm()
    } else if (this.props.formErrors) {
      this.touchFieldsWithError()
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    this.save()
  }

  handleKeyPress = event => {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault()
      this.save()
    }

    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
      event.preventDefault()
    }
  }

  showErrors = event => {
    event.preventDefault()
    this.touchFieldsWithError()
    this.focusErrorFields()
  }

  msg = id => (this.props.intl.formatMessage({id}))

  render() {
    const props = this.props

    if (!this.isEntityLoaded()) {
      return <div/>
    }

    return (
      <form
        className="form-horizontal detail-form"
        tabIndex="0"
        onSubmit={this.handleSubmit}
        onKeyDown={this.handleKeyPress}
      >
        {this.formBuilder()}
        {!this.isReadOnlyForm()
        && <LayoutBox alignment="horizontal">
          <LayoutBox alignment="vertical">
            {!props.valid && props.anyTouched && <ErrorBox formErrors={props.formErrors} showErrors={this.showErrors}/>}
            <Button
              disabled={props.submitting || (props.anyTouched && !props.valid)}
              ink="primary"
              label={this.msg(`client.entity-detail.${props.mode === modes.CREATE ? 'create' : 'save'}`)}
              look="raised"
              pending={props.submitting}
              type="submit"
            />
            {props.lastSave
            && <div>
              <FormattedMessage id="client.entity-detail.lastSave"/>
              <span style={{marginLeft: '3px'}}> <FormattedRelative value={props.lastSave}/></span>
            </div>
            }
          </LayoutBox>
        </LayoutBox>
        }
      </form>
    )
  }
}

DetailForm.propTypes = {
  intl: intlShape.isRequired,
  mode: PropTypes.oneOf(['update', 'create']),
  entityModel: PropTypes.object.isRequired,
  submitForm: PropTypes.func.isRequired,
  formDefinition: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
  formValues: PropTypes.object,
  uploadDocument: PropTypes.func.isRequired,
  loadRelationEntities: PropTypes.func.isRequired,
  relationEntities: PropTypes.shape({
    entityName: PropTypes.shape({
      loaded: PropTypes.bool,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string,
          label: PropTypes.string
        })
      )
    })
  }).isRequired,
  form: PropTypes.string.isRequired,
  touch: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  anyTouched: PropTypes.bool,
  formErrors: PropTypes.object,
  valid: PropTypes.bool,
  lastSave: PropTypes.number,
  fireTouched: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'detailForm',
  destroyOnUnmount: false
})(DetailForm)
