import PropTypes from 'prop-types'
import React from 'react'
import {Prompt} from 'react-router-dom'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {Button, RouterLink} from 'tocco-ui'
import {queryString as queryStringUtil} from 'tocco-util'

import {StyledEntityDetailBackButton} from './StyledEntityDetail'

const DetailLinkRelative = ({currentKey, entityKey, children, relation}) => (
  <RouterLink to={`${currentKey}/${relation}/${entityKey}`}>{children}</RouterLink>
)

DetailLinkRelative.propTypes = {
  currentKey: PropTypes.string.isRequired,
  entityKey: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  relation: PropTypes.string.isRequired
}

class EntityDetail extends React.Component {
  constructor(props) {
    super(props)
    this.props.loadDetailParams(this.props.router.match.url)
    this.props.setFormTouched(false)
  }

  componentWillUnmount() {
    this.props.clearDetailParams()
  }

  handleSubGridRowClick = ({id, gridName, relationName}) => {
    this.props.router.history.push(`${this.props.router.match.url}/${relationName}/${id}`)
  }

  navigateToCreate = relationName => {
    if (relationName) {
      this.props.router.history.push(`${this.props.router.match.url}/${relationName}/`)
    } else {
      const url = this.props.router.match.url.replace(/\/$/, '')
      const a = url.substring(0, url.lastIndexOf('/') + 1)
      this.props.router.history.push(a)
    }
  }

  handleEntityCreated = ({id}) => {
    this.props.setFormTouched(false)
    let url = this.props.router.match.url
    url = url.substr(-1) !== '/' ? (url += '/') : url
    this.props.router.history.push(`${url}${id}`)
  }

  navigateToAction = (definition, selection) => {
    const search = queryStringUtil.toQueryString({
      selection,
      actionProperties: definition.properties
    })
    this.props.router.history.push({
      pathname: '/action/' + definition.appId,
      state: {definition, selection},
      search
    })
  }

  handleTouchedChange = ({touched}) => {
    this.props.setFormTouched(touched)
  }

  handleGoBack = () => {
    this.props.router.history.push(this.props.detailParams.parentUrl)
  }

  getApp = ({entityName, entityId, formName, mode}, locale) => (
    <EntityDetailApp
      id={`${this.props.appId}_detail_${formName}_${entityId}`}
      entityName={entityName}
      entityId={entityId}
      formName={formName}
      mode={mode}
      navigationStrategy={{
        DetailLinkRelative: props => <DetailLinkRelative {...props} currentKey={entityId} />,
        navigateToCreateRelative: this.navigateToCreate,
        navigateToActionRelative: this.navigateToAction
      }}
      onSubGridRowClick={this.handleSubGridRowClick}
      onEntityCreated={this.handleEntityCreated}
      onEntityDeleted={this.handleGoBack}
      onTouchedChange={this.handleTouchedChange}
      emitAction={action => {
        this.props.dispatchEmittedAction(action)
      }}
      theme={{}}
      locale={locale}
    />
  )

  msg = id => this.props.intl.formatMessage({id})

  render = () => (
    <React.Fragment>
      <Prompt
        when={this.props.formTouched}
        message={this.msg('client.entity-browser.detail.confirmTouchedFormLeave')}
      />
      {this.props.detailParams && (
        <React.Fragment>
          {this.props.detailParams.showBackButton && (
            <StyledEntityDetailBackButton>
              <Button
                data-cy="entity-detail_back-button"
                icon="chevron-left"
                label={this.msg('client.entity-browser.back')}
                look="raised"
                onClick={this.handleGoBack}
              />
            </StyledEntityDetailBackButton>
          )}
          {this.getApp(this.props.detailParams, this.props.locale)}
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

EntityDetail.propTypes = {
  intl: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
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
