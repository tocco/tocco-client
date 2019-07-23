import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'
import _isEmpty from 'lodash/isEmpty'
import {form} from 'tocco-app-extensions'
import {LoadMask} from 'tocco-ui'

import DetailFormContainer from '../../containers/DetailFormContainer'
import {asyncValidate, AsyncValidationException} from '../../util/detailView/asyncValidation'

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
      <LoadMask
        required={[props.formInitialValues]}
        loadingText={this.msg('client.entity-detail.loadingText')}
      >
        <DetailFormContainer
          mode={this.props.mode}
          validate={this.getSyncValidation()}
          asyncValidate={this.handledAsyncValidate}
        />
      </LoadMask>
    )
  }
}

export default DetailView

DetailView.propTypes = {
  intl: intlShape.isRequired,
  mode: PropTypes.oneOf(['update', 'create']),
  loadDetailView: PropTypes.func.isRequired,
  unloadDetailView: PropTypes.func.isRequired,
  logError: PropTypes.func.isRequired,
  entityModel: PropTypes.object.isRequired,
  entityName: PropTypes.string.isRequired,
  entityId: PropTypes.string,
  formInitialValues: PropTypes.shape({
    initial: PropTypes.objectOf(PropTypes.string)
  })
}
