import PropTypes from 'prop-types'
import React from 'react'
import {Prompt} from 'react-router-dom'
import {intlShape} from 'react-intl'
import {Button} from 'tocco-ui'
import EntityDetailApp from 'tocco-entity-detail/src/main'

import {StyledEntityDetailBackButton} from './StyledEntityDetail'

class EntityDetail extends React.Component {
  componentDidMount() {
    this.props.loadDetailParams(this.props.router.match.url)
    this.props.setFormTouched(false)
  }

  componentWillUnmount() {
    this.props.clearDetailParams()
  }

  handleSubGridRowClick = ({id, gridName, relationName}) => {
    this.props.router.history.push(`${this.props.router.match.url}/${relationName}/${id}`)
  }

  handleSubGridNavigateToCreate = ({gridName, relationName}) => {
    this.props.router.history.push(`${this.props.router.match.url}/${relationName}/`)
  }

  handleEntityCreated = ({id}) => {
    this.props.setFormTouched(false)
    let url = this.props.router.match.url
    url = (url.substr(-1) !== '/') ? url += '/' : url
    this.props.router.history.push(`${url}${id}`)
  }

  handleTouchedChange = ({touched}) => {
    this.props.setFormTouched(touched)
  }

  handleGoBack = () => {
    this.props.router.history.push(this.props.detailParams.parentUrl)
  }

  getApp = ({entityName, entityId, formName, mode}) => (<EntityDetailApp
    id={`${this.props.appId}_detail_${formName}_${entityId}` }
    entityName={entityName}
    entityId={entityId}
    formName={formName}
    mode={mode}
    onSubGridRowClick={this.handleSubGridRowClick}
    onSubGridNavigateToCreate={this.handleSubGridNavigateToCreate}
    onEntityCreated={this.handleEntityCreated}
    onTouchedChange={this.handleTouchedChange}
    emitAction={action => {
      this.props.dispatchEmittedAction(action)
    }}
    showSubGridsCreateButton={this.props.showSubGridsCreateButton}
    theme={{}}
  />)

  msg = id => (this.props.intl.formatMessage({id}))

  render = () =>
    <React.Fragment>
      <Prompt
        when={this.props.formTouched}
        message={this.msg('client.entity-browser.detail.confirmTouchedFormLeave')}
      />
      {this.props.detailParams
      && <React.Fragment>
        {this.props.detailParams.showBackButton
        && <StyledEntityDetailBackButton>
          <Button
            data-cy="entity-detail_back-button"
            icon="chevron-left"
            label={this.msg('client.entity-browser.back')}
            look="raised"
            onClick={this.handleGoBack}
          />
        </StyledEntityDetailBackButton>}
        {this.getApp(this.props.detailParams)}
      </React.Fragment>
      }
    </React.Fragment>
}

EntityDetail.propTypes = {
  intl: intlShape.isRequired,
  dispatchEmittedAction: PropTypes.func.isRequired,
  loadDetailParams: PropTypes.func.isRequired,
  clearDetailParams: PropTypes.func.isRequired,
  setFormTouched: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  detailParams: PropTypes.object,
  formTouched: PropTypes.bool,
  showSubGridsCreateButton: PropTypes.bool,
  appId: PropTypes.string
}

export default EntityDetail
