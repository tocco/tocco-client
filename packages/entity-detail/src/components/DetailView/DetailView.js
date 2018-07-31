import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'
import _isEmpty from 'lodash/isEmpty'

import DetailForm from '../DetailForm'
import {form} from 'tocco-util'
import {asyncValidate, AsyncValidationException} from '../../util/detailView/asyncValidation'
import LoadMask from 'tocco-ui/src/LoadMask/LoadMask'

class DetailView extends React.Component {
  componentWillUnmount() {
    this.props.unloadDetailView()
  }

  handledAsyncValidate = values =>
    asyncValidate(
      values,
      this.props.formInitialValues,
      this.props.entityName,
      this.props.entityId,
      this.props.entityModel,
      this.props.mode
    ).catch(error => {
      if (error instanceof AsyncValidationException) {
        throw error.errors
      } else {
        this.props.logError('client.common.unexpectedError', 'client.entity-detail.validationError', error)
      }
    })

  getSyncValidation = () => {
    if (!this.validateSingleton && !_isEmpty(this.props.entityModel)) {
      this.validateSingleton = form.syncValidation(this.props.entityModel)
    }
    return this.validateSingleton
  }

  msg = id => this.props.intl.formatMessage({id})

  render() {
    const props = this.props

    return (
      <div className="detail-view">
        <LoadMask
          required={[props.formInitialValues]}
          loadingText={this.msg('client.entity-detail.loadingText')}
        >
          <DetailForm
            mode={this.props.mode}
            validate={this.getSyncValidation()}
            asyncValidate={this.handledAsyncValidate}
            submitForm={props.submitForm}
            formDefinition={props.formDefinition}
            entity={props.entity}
            loadRelationEntities={props.loadRelationEntities}
            relationEntities={props.relationEntities}
            formValues={props.formValues}
            formErrors={props.formErrors}
            entityModel={props.entityModel}
            intl={props.intl}
            lastSave={props.lastSave}
            fireTouched={props.fireTouched}
            uploadDocument={props.uploadDocument}
            openAdvancedSearch={props.openAdvancedSearch}
          />
        </LoadMask>
      </div>
    )
  }
}

export default DetailView

DetailView.propTypes = {
  intl: intlShape.isRequired,
  mode: PropTypes.oneOf(['update', 'create']),
  loadDetailView: PropTypes.func.isRequired,
  unloadDetailView: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  logError: PropTypes.func.isRequired,
  formDefinition: PropTypes.shape({
    children: PropTypes.array
  }).isRequired,
  entityModel: PropTypes.object.isRequired,
  entityName: PropTypes.string.isRequired,
  entityId: PropTypes.string,
  formValues: PropTypes.object,
  formErrors: PropTypes.object,
  entity: PropTypes.object,
  loadRelationEntities: PropTypes.func.isRequired,
  uploadDocument: PropTypes.func.isRequired,
  formInitialValues: PropTypes.object,
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
  lastSave: PropTypes.number,
  fireTouched: PropTypes.func.isRequired
}
