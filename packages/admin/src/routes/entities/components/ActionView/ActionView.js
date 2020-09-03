import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {queryString as queryStringUtil} from 'tocco-util'
import {intlShape} from 'react-intl'
import _get from 'lodash/get'

import Action from '../Action'
import {currentViewPropType} from '../../utils/propTypes'

const ActionView = ({history, match, setCurrentViewTitle, currentViewInfo, intl}) => {
  const {location} = history
  useEffect(() => {
    if (currentViewInfo) {
      setCurrentViewTitle(intl.formatMessage({id: `client.actions.${currentViewInfo.actionId}.title`}))
    }

    return () => {
      setCurrentViewTitle(null)
    }
  }, [currentViewInfo])

  if (!currentViewInfo) {
    return null
  }

  const queryParams = queryStringUtil.fromQueryString(location.search)
  const selection = _get(location, 'state.selection', queryParams.actionProperties)
  const actionProperties = _get(location, 'state.definition.properties', queryParams.actionProperties)

  return (
    <Action
      history={history}
      match={match}
      appId={currentViewInfo.actionId}
      selection={selection}
      actionProperties={actionProperties}
    />
  )
}

ActionView.propTypes = {
  intl: intlShape.isRequired,
  currentViewInfo: currentViewPropType,
  setCurrentViewTitle: PropTypes.func.isRequired,
  history: PropTypes.shape({
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

export default ActionView
