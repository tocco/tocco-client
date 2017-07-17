import React from 'react'
import {intlShape} from 'react-intl'
import _isEmpty from 'lodash/isEmpty'

import DetailForm from '../DetailForm'
import syncValidation from '../../util/detailView/syncValidation'
import {asyncValidate, AsyncValidationException} from '../../util/detailView/asyncValidation'
import LoadMask from 'tocco-ui/src/LoadMask/LoadMask'

class DetailView extends React.Component {
  componentWillUnmount() {
    this.props.unloadDetailView()
  }

  handledAsyncValidate = values => {
    return asyncValidate(values, this.props.formInitialValues).catch(error => {
      if (error instanceof AsyncValidationException) {
        throw error.errors
      } else {
        this.props.logError('client.common.unexpectedError', 'client.entity-detail.validationError', error)
      }
    })
  }

  getSyncValidation = () => {
    if (!this.validateSingleton && !_isEmpty(this.props.entityModel)) {
      this.validateSingleton = syncValidation(this.props.entityModel)
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
            validate={this.getSyncValidation()}
            asyncValidate={this.handledAsyncValidate}
            submitForm={props.submitForm}
            formDefinition={props.formDefinition}
            entity={props.entity}
            loadRelationEntity={props.loadRelationEntity}
            loadRemoteEntity={props.loadRemoteEntity}
            relationEntities={props.relationEntities}
            remoteEntities={props.remoteEntities}
            formValues={props.formValues}
            formErrors={props.formErrors}
            entityModel={props.entityModel}
            intl={props.intl}
            lastSave={props.lastSave}
            fireTouched={props.fireTouched}
          />
        </LoadMask>
      </div>
    )
  }
}

export default DetailView

DetailView.propTypes = {
  intl: intlShape.isRequired,
  loadDetailView: React.PropTypes.func.isRequired,
  unloadDetailView: React.PropTypes.func.isRequired,
  submitForm: React.PropTypes.func.isRequired,
  logError: React.PropTypes.func.isRequired,
  formDefinition: React.PropTypes.shape({
    children: React.PropTypes.array
  }).isRequired,
  entityModel: React.PropTypes.object.isRequired,
  entityId: React.PropTypes.string.isRequired,
  formValues: React.PropTypes.object,
  formErrors: React.PropTypes.objectOf(
    React.PropTypes.objectOf(React.PropTypes.arrayOf(
      React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object])))
  ),
  entity: React.PropTypes.object,
  loadRelationEntity: React.PropTypes.func.isRequired,
  loadRemoteEntity: React.PropTypes.func.isRequired,
  formInitialValues: React.PropTypes.object,
  relationEntities: React.PropTypes.shape({
    entityName: React.PropTypes.shape({
      loaded: React.PropTypes.bool,
      data: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          value: React.PropTypes.string,
          label: React.PropTypes.string
        })
      )
    })
  }).isRequired,
  remoteEntities: React.PropTypes.shape({
    fieldName: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      entities: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          key: React.PropTypes.string,
          display: React.PropTypes.string
        })
      )
    })
  }).isRequired,
  lastSave: React.PropTypes.number,
  fireTouched: React.PropTypes.func.isRequired
}
