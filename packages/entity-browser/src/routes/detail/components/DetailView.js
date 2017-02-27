import React from 'react'
import {Button} from 'tocco-ui'
import {intlShape} from 'react-intl'
import DetailForm from './DetailForm'
import syncValidation from '../../../util/detailView/syncValidation'
import {asyncValidate, AsyncValidationException} from '../../../util/detailView/asyncValidation'

class DetailView extends React.Component {
  constructor(props) {
    super(props)
    props.loadEntity(props.router.match.params.entityId)
    this.validate = syncValidation(props.entityModel, props.intl)
  }

  handledAsyncValidate = values => {
    return asyncValidate(values).catch(error => {
      if (error instanceof AsyncValidationException) {
        throw error.errors
      } else {
        this.props.logError('error.unhandled', 'entity-browser.validationError', error)
      }
    })
  }

  render() {
    const props = this.props
    return (
      <div className="detail-view">
        <Button icon="glyphicon-chevron-left" onClick={props.router.goBack} label="Back"/>
        {props.formInitialValues
        && <DetailForm
          validate={this.validate}
          asyncValidate={this.handledAsyncValidate}
          submitForm={props.submitForm}
          formDefinition={props.formDefinition}
          entity={props.entity}
          loadRelationEntities={props.loadRelationEntities}
          selectBoxStores={props.selectBoxStores}
          formErrors={props.formErrors}
          entityModel={props.entityModel}
          intl={props.intl}
          lastSave={props.lastSave}
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
  loadEntity: React.PropTypes.func.isRequired,
  submitForm: React.PropTypes.func.isRequired,
  logError: React.PropTypes.func.isRequired,
  formDefinition: React.PropTypes.shape({
    children: React.PropTypes.array
  }).isRequired,
  entityModel: React.PropTypes.object.isRequired,
  formErrors: React.PropTypes.objectOf(
    React.PropTypes.objectOf(React.PropTypes.arrayOf(
      React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object])))
  ),
  entity: React.PropTypes.object,
  loadRelationEntities: React.PropTypes.func,
  formInitialValues: React.PropTypes.object,
  selectBoxStores: React.PropTypes.shape({
    entityName: React.PropTypes.shape({
      loaded: React.PropTypes.bool,
      data: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          value: React.PropTypes.string,
          label: React.PropTypes.string
        })
      )
    })
  }),
  lastSave: React.PropTypes.number
}

