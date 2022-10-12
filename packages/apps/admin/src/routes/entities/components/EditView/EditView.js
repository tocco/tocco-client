import PropTypes from 'prop-types'
import queryString from 'query-string'
import {useState} from 'react'
import {Prompt} from 'react-router'
import styled from 'styled-components'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {scale, theme} from 'tocco-ui'

import {goBack} from '../../../../utils/routing'
import navigationStrategy from '../../utils/navigationStrategy'
import {currentViewPropType} from '../../utils/propTypes'
import Action from '../Action'

export const StyledEntityDetailAppWrapper = styled.div`
  margin: 0;
  background-color: ${theme.color('paper')};
  padding: 0 0 0 ${scale.space(0)};
  overflow: hidden;
  height: 100%;
`

const EditView = props => {
  const {
    currentViewInfo,
    history,
    match,
    intl,
    chooseDocument,
    emitAction,
    propagateRefresh,
    invalidateLastBreadcrumb
  } = props

  const [touched, setTouched] = useState(false)
  const mode = 'update'

  if (!currentViewInfo || currentViewInfo.pathname !== history.location.pathname) {
    return null
  }

  const queryFormName = queryString.parse(location.search).formName

  const handleToucheChanged = ({touched: changedTouched}) => setTouched(changedTouched)

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

  const handleEntityUpdated = () => {
    const location = history.location
    invalidateLastBreadcrumb(location)
  }

  const handleRefresh = () => {
    const location = history.location
    propagateRefresh(location)
  }

  const handleSubGridRowClick = ({id, relationName}) => {
    const entityBaseUrl = goBack(match.url)
    history.push(`${entityBaseUrl}/${relationName}/${id}`)
  }

  const entityName = currentViewInfo.model.name
  const msg = id => intl.formatMessage({id})

  return (
    <StyledEntityDetailAppWrapper>
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
        onTouchedChange={handleToucheChanged}
        navigationStrategy={{...navigationStrategy(history, match), navigateToCreateRelative}}
        chooseDocument={chooseDocument}
        onEntityDeleted={handleEntityDeleted}
        onEntityUpdated={handleEntityUpdated}
        onRefresh={handleRefresh}
        actionAppComponent={Action}
        onSubGridRowClick={handleSubGridRowClick}
      />
    </StyledEntityDetailAppWrapper>
  )
}

EditView.propTypes = {
  intl: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  currentViewInfo: currentViewPropType,
  chooseDocument: PropTypes.func.isRequired,
  emitAction: PropTypes.func.isRequired,
  propagateRefresh: PropTypes.func.isRequired,
  invalidateLastBreadcrumb: PropTypes.func.isRequired
}

export default EditView
