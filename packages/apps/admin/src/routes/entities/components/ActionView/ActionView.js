import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {queryString as queryStringUtil, js} from 'tocco-util'

import navigationStrategy from '../../utils/navigationStrategy'
import {currentViewPropType} from '../../utils/propTypes'
import {getPathInfo} from '../../utils/url'
import Action from '../Action'

const ActionView = ({setCurrentViewTitle, currentViewInfo, intl}) => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentViewInfo) {
      setCurrentViewTitle(intl.formatMessage({id: `client.actions.${currentViewInfo.actionId}.title`}))
    }

    return () => {
      setCurrentViewTitle(null)
    }
  }, [currentViewInfo, setCurrentViewTitle, intl])

  if (!currentViewInfo) {
    return null
  }

  const queryParams = queryStringUtil.fromQueryString(location.search)
  const selection = _get(location, 'state.selection', queryParams.actionProperties)
  const actionProperties = _get(location, 'state.definition.properties', queryParams.actionProperties)

  const navigateBack = () => {
    const pathInfo = getPathInfo(location.pathname)
    const originUrl = pathInfo.key ? '../' : '../../'
    navigate(originUrl)
  }

  return (
    <Action
      appId={currentViewInfo.actionId}
      selection={selection}
      actionProperties={actionProperties}
      navigationStrategy={navigationStrategy(navigate)}
      onSuccess={navigateBack}
      onError={navigateBack}
      onCancel={navigateBack}
    />
  )
}

ActionView.propTypes = {
  intl: PropTypes.object.isRequired,
  currentViewInfo: currentViewPropType,
  setCurrentViewTitle: PropTypes.func.isRequired
}

const areEqual = (prevProps, nextProps) => {
  const diff = Object.keys(js.difference(prevProps, nextProps))
  return diff.length === 0
}

export default React.memo(ActionView, areEqual)
