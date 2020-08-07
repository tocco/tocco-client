import React, {useState} from 'react'
import PropTypes from 'prop-types'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {Prompt} from 'react-router'
import {intlShape} from 'react-intl'
import queryString from 'query-string'
import {selection as selectionUtil} from 'tocco-util'
import styled from 'styled-components'
import {scale, StyledScrollbar, theme} from 'tocco-ui'

import {goBack} from '../../../../utils/routing'
import StyledLink from '../../../../components/StyledLink/StyledLink'
import Action from '../Action'
import {currentViewPropType} from '../../utils/propTypes'

export const EntityDetailAppWrapper = styled.div`
  margin: 0;
  background-color: ${theme.color('paper')};
  padding: 0 0 0 1.5rem;
  overflow-y: auto;
  height: 100%;
  ${StyledScrollbar}

  .StyledRelationsViewWrapper {
    background-color: ${theme.color('paper')};
    position: sticky;
    top: 0;
    z-index: 1;
    padding-bottom: ${scale.space(-0.5)};
    display: flex;
    flex-wrap: wrap;

    & > * {
      margin-top: ${scale.space(-0.5)};
    }
  }
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

  const handleNavigateToCreate = relationName => {
    if (relationName) {
      history.push(`${match.url}/${relationName}/create`)
    } else {
      const entityBaseUrl = goBack(match.url, 2)
      history.push(entityBaseUrl + '/create')
    }
  }

  const handleEntityDeleted = () => {
    const entityBaseUrl = goBack(match.url, 2)
    history.push(entityBaseUrl)
  }

  const handleNavigateToAction = ({definition, selection}) => {
    const entityBaseUrl = goBack(match.url)
    const search = selectionUtil.selectionToQueryString(selection)
    history.push({
      pathname: entityBaseUrl + '/action/' + definition.appId,
      state: {definition, selection},
      search
    })
  }

  const handleSubGridRowClick = ({id, relationName}) => {
    const entityBaseUrl = goBack(match.url)
    history.push(`${entityBaseUrl}/${relationName}/${id}`)
  }

  const entityName = currentViewInfo.model.name
  const msg = id => intl.formatMessage({id})

  return <EntityDetailAppWrapper>
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
      linkFactory={{
        detail: (entity, relation, key, children) =>
          <StyledLink to={`/e/${entity}/${key}`} target="_blank">{children}</StyledLink>
      }}
      onNavigateToCreate={handleNavigateToCreate}
      onNavigateToAction={handleNavigateToAction}
      onEntityDeleted={handleEntityDeleted}
      actionAppComponent={Action}
      onSubGridRowClick={handleSubGridRowClick}
    />
  </EntityDetailAppWrapper>
}

EditView.propTypes = {
  intl: intlShape,
  match: PropTypes.object,
  history: PropTypes.object,
  currentViewInfo: currentViewPropType,
  emitAction: PropTypes.func.isRequired
}

export default EditView
