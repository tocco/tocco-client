import React, {useState} from 'react'
import PropTypes from 'prop-types'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {Prompt} from 'react-router'
import {intlShape} from 'react-intl'
import queryString from 'query-string'
import styled from 'styled-components'
import {StyledScrollbar, theme, scale} from 'tocco-ui'

import {goBack} from '../../../../utils/routing'
import Action from '../Action'
import {currentViewPropType} from '../../utils/propTypes'
import navigationStrategy from '../../utils/navigationStrategy'

export const StyledEntityDetailAppWrapper = styled.div`
  margin: 0;
  background-color: ${theme.color('paper')};
  padding: 0 ${scale.space(-0.5)} 0 ${scale.space(0)};
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  ${StyledScrollbar}
`

const EditView = props => {
  const {
    currentViewInfo,
    history,
    match,
    intl,
    emitAction
  } = props

  const [touched, setTouched] = useState(false)
  const mode = 'update'

  if (!currentViewInfo || currentViewInfo.pathname !== history.location.pathname) {
    return null
  }

  const queryFormName = queryString.parse(location.search).formName

  const handleToucheChanged = ({touched}) => {
    setTouched(touched)
  }

  const navigateToCreateRelative = (relationName, state) => {
    if (relationName) {
      const entityBaseUrl = goBack(match.url, 1)
      history.push({
        pathname: `${entityBaseUrl}/${relationName}/create`,
        state
      })
    } else {
      const entityBaseUrl = goBack(match.url, 2)
      history.push({
        pathname: entityBaseUrl + '/create',
        state
      })
    }
  }

  const handleEntityDeleted = () => {
    const entityBaseUrl = goBack(match.url, 2)
    history.push(entityBaseUrl)
  }

  const handleSubGridRowClick = ({id, relationName}) => {
    const entityBaseUrl = goBack(match.url)
    history.push(`${entityBaseUrl}/${relationName}/${id}`)
  }

  const entityName = currentViewInfo.model.name
  const msg = id => intl.formatMessage({id})

  return <StyledEntityDetailAppWrapper>
    <Prompt
      when={touched}
      message={location => {
        if (history.location.pathname !== location.pathname) {
          return msg('client.entity-browser.detail.confirmTouchedFormLeave')
        }

        return false
      }}
    />
    <EntityDetailApp
      entityName={entityName}
      entityId={currentViewInfo.key}
      formName={queryFormName || entityName}
      mode={mode}
      emitAction={emitAction}
      onTouchedChange = {handleToucheChanged}
      navigationStrategy={{...navigationStrategy(history, match), navigateToCreateRelative}}
      onEntityDeleted={handleEntityDeleted}
      actionAppComponent={Action}
      onSubGridRowClick={handleSubGridRowClick}
    />
  </StyledEntityDetailAppWrapper>
}

EditView.propTypes = {
  intl: intlShape,
  match: PropTypes.object,
  history: PropTypes.object,
  currentViewInfo: currentViewPropType,
  emitAction: PropTypes.func.isRequired
}

export default EditView
