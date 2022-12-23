import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {js, queryString as queryStringUtil} from 'tocco-util'

import {goBack} from '../../../../utils/routing'
import navigationStrategy from '../../utils/navigationStrategy'
import {currentViewPropType} from '../../utils/propTypes'
import {getPathInfo} from '../../utils/url'
import Action from '../Action'

const ActionView = ({history, match, setCurrentViewTitle, currentViewInfo, intl}) => {
  const {location} = history
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
  const selection = _get(location, 'state.selection', queryParams.selection)
  const actionProperties = _get(location, 'state.definition.properties', queryParams.actionProperties)

  const navigateBack = () => {
    const pathInfo = getPathInfo(match.url)
    const originUrl = pathInfo.key ? goBack(match.url) : goBack(match.url, 2)
    history.replace(originUrl)
  }

  return (
    <Action
      history={history}
      match={match}
      appId={currentViewInfo.actionId}
      selection={selection}
      actionProperties={actionProperties}
      navigationStrategy={navigationStrategy(history, match)}
      onSuccess={navigateBack}
      onError={navigateBack}
      onCancel={navigateBack}
    />
  )
}

ActionView.propTypes = {
  intl: PropTypes.object.isRequired,
  currentViewInfo: currentViewPropType,
  setCurrentViewTitle: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
      state: PropTypes.shape({
        selection: PropTypes.object,
        definition: PropTypes.shape({
          appId: PropTypes.string
        })
      })
    })
  }).isRequired,
  match: PropTypes.object
}

const areEqual = (prevProps, nextProps) => {
  const diff = Object.keys(js.difference(prevProps, nextProps))
  return diff.length === 0
}

export default React.memo(ActionView, areEqual)
