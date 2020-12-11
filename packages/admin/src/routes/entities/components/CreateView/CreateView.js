import React, {useState} from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import {intlShape} from 'react-intl'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {Prompt} from 'react-router'
import styled from 'styled-components'
import {theme, StyledScrollbar} from 'tocco-ui'

import {currentViewPropType} from '../../utils/propTypes'

const StyledEntityDetailAppWrapper = styled.div`
  margin: 0;
  background-color: ${theme.color('paper')};
  padding: 0 0 0 1.5rem;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  ${StyledScrollbar}
`

const CreateView = props => {
  const {
    currentViewInfo,
    history,
    match,
    intl,
    dispatchEmittedAction
  } = props

  const [touched, setTouched] = useState(false)

  const mode = 'create'

  if (!currentViewInfo) {
    return null
  }
  const {model, reverseRelation, parentKey} = currentViewInfo
  const entityName = model.name

  const isMultiReverseRelation = _get(model, `paths.${reverseRelation}.multi`, false)

  const defaultValues = [
    ...((reverseRelation && parentKey)
      ? [{id: reverseRelation, value: isMultiReverseRelation ? [parentKey] : parentKey}]
      : []
    )
  ]

  const handleEntityCreated = ({id}) => {
    setTouched(false)
    history.push(match.url.replace(/create$/, id))
  }

  const msg = id => intl.formatMessage({id})
  const handleToucheChanged = ({touched}) => setTouched(touched)

  return <StyledEntityDetailAppWrapper>
    <Prompt
      when={touched}
      message={msg('client.entity-browser.detail.confirmTouchedFormLeave')}
    />
    <EntityDetailApp
      entityName={entityName}
      formName={entityName}
      mode={mode}
      defaultValues={defaultValues}
      emitAction={action => {
        dispatchEmittedAction(action)
      }}
      onEntityCreated={handleEntityCreated}
      onTouchedChange={handleToucheChanged}
    />
  </StyledEntityDetailAppWrapper>
}

CreateView.propTypes = {
  intl: intlShape,
  match: PropTypes.object,
  history: PropTypes.object,
  currentViewInfo: currentViewPropType,
  dispatchEmittedAction: PropTypes.func.isRequired
}

export default CreateView
