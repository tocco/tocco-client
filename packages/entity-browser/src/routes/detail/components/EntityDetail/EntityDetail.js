import PropTypes from 'prop-types'
import React from 'react'
import {Prompt} from 'react-router-dom'

import {Button, LayoutBox} from 'tocco-ui'
import {intlShape} from 'react-intl'
import EntityDetailApp from 'tocco-entity-detail/src/main'

class EntityDetail extends React.Component {
  componentWillMount() {
    this.props.loadDetailParams(this.props.router.match.url)
    this.props.setFormTouched(false)
  }

  componentWillUnmount() {
    this.props.clearDetailParams()
  }

  handleSubGridRowClick = ({id, gridName, relationName}) => {
    this.props.router.history.push(`${this.props.router.match.url}/${relationName}/${id}`)
  }

  handleTouchedChange = ({touched}) => {
    this.props.setFormTouched(touched)
  }

  handleGoBack = () => {
    this.props.router.history.push(this.props.detailParams.parentUrl)
  }

  getApp = ({entityName, entityId, formName}) => (<EntityDetailApp
    entityName={entityName}
    entityId={entityId}
    formName={formName}
    onSubGridRowClick={this.handleSubGridRowClick}
    onTouchedChange={this.handleTouchedChange}
    emitAction={action => {
      this.props.dispatchEmittedAction(action)
    }}

  />)

  msg = id => (this.props.intl.formatMessage({id}))

  render = () => {
    return (
      <div>
        <div>
          <Prompt
            when={this.props.formTouched}
            message={this.msg('client.entity-browser.detail.confirmTouchedFormLeave')}
          />
          {this.props.detailParams
          && <div>
            {this.props.detailParams.showBackButton
            && <LayoutBox alignment="horizontal">
              <div>
                <Button
                  type="button"
                  label={this.msg('client.entity-browser.back')}
                  icon="fa fa-chevron-left"
                  onClick={this.handleGoBack}
                />
              </div>
            </LayoutBox>
            }
            {this.getApp(this.props.detailParams)}
          </div>
          }
        </div>
      </div>
    )
  }
}

EntityDetail.propTypes = {
  intl: intlShape.isRequired,
  dispatchEmittedAction: PropTypes.func.isRequired,
  loadDetailParams: PropTypes.func.isRequired,
  clearDetailParams: PropTypes.func.isRequired,
  setFormTouched: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  detailParams: PropTypes.object,
  formTouched: PropTypes.bool
}

export default EntityDetail
