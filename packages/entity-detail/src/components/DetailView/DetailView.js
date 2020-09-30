import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'
import _isEmpty from 'lodash/isEmpty'
import {form} from 'tocco-app-extensions'
import {LoadMask} from 'tocco-ui'

import modes from '../../util/modes'
import DetailFormContainer from '../../containers/DetailFormContainer'

class DetailView extends React.Component {
  componentWillUnmount() {
    this.props.unloadDetailView()
  }

  handledAsyncValidate = formValues =>
    form.asyncValidation(
      formValues,
      this.props.mode === modes.CREATE ? {} : this.props.formInitialValues,
      this.props.fieldDefinitions,
      this.props.mode
    )

  getSyncValidation = () => {
    if (!this.validateSingleton && !_isEmpty(this.props.fieldDefinitions)) {
      this.validateSingleton = form.syncValidation(this.props.fieldDefinitions)
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
  fieldDefinitions: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      id: PropTypes.string,
      validation: PropTypes.object
    })
  ).isRequired,
  entityName: PropTypes.string.isRequired,
  entityId: PropTypes.string,
  formInitialValues: PropTypes.shape({
    initial: PropTypes.objectOf(PropTypes.string)
  })
}
