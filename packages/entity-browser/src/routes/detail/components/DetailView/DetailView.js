import React from 'react'
import {intlShape} from 'react-intl'
import {Button} from 'tocco-ui'

import DetailForm from '../DetailForm'
import syncValidation from '../../../../util/detailView/syncValidation'
import {asyncValidate, AsyncValidationException} from '../../../../util/detailView/asyncValidation'

class DetailView extends React.Component {
  componentWillMount() {
    const {modelPaths, entityId} = this.props
    this.props.loadDetailView(modelPaths, entityId)
  }

  handledAsyncValidate = values => {
    return asyncValidate(values, this.props.formInitialValues).catch(error => {
      if (error instanceof AsyncValidationException) {
        throw error.errors
      } else {
        this.props.logError('error.unhandled', 'entity-browser.validationError', error)
      }
    })
  }

  handleGoBack = () => {
    this.props.router.push(this.props.parentUrl)
  }

  getSyncValidation = () => {
    if (!this.validateSingleton) {
      this.validateSingleton = syncValidation(this.props.entityModel, this.props.intl)
    }
    return this.validateSingleton
  }

  msg = id => this.props.intl.formatMessage({id})

  render() {
    const props = this.props

    return (
      <div className="detail-view">
        <Button
          type="button"
          label={this.msg('client.entity-browser.back')}
          onClick={this.handleGoBack}
        />
        {props.formInitialValues
        && <DetailForm
          validate={this.getSyncValidation()}
          asyncValidate={this.handledAsyncValidate}
          submitForm={props.submitForm}
          formDefinition={props.formDefinition}
          entity={props.entity}
          loadRelationEntity={props.loadRelationEntity}
          loadRemoteEntity={props.loadRemoteEntity}
          relationEntities={props.relationEntities}
          remoteEntities={props.remoteEntities}
          formErrors={props.formErrors}
          entityModel={props.entityModel}
          intl={props.intl}
          lastSave={props.lastSave}
          goBack={this.handleGoBack}
        />
        }
      </div>
    )
  }
}

export default DetailView

DetailView.propTypes = {
  intl: intlShape.isRequired,
  router: React.PropTypes.object.isRequired,
  loadDetailView: React.PropTypes.func.isRequired,
  submitForm: React.PropTypes.func.isRequired,
  logError: React.PropTypes.func.isRequired,
  formDefinition: React.PropTypes.shape({
    children: React.PropTypes.array
  }).isRequired,
  entityModel: React.PropTypes.object.isRequired,
  modelPaths: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  entityId: React.PropTypes.string.isRequired,
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
  parentUrl: React.PropTypes.string
}

DetailView.defaultProps = {
  parentUrl: '/'
}
