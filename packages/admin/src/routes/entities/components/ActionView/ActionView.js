import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import {intlShape} from 'react-intl'

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

  const querySelection = queryString.parse(location.search).selection
  const selection = (location.state && location.state.selection) || querySelection

  return <Action history={history} match={match} appId={currentViewInfo.actionId} selection={selection}/>
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
