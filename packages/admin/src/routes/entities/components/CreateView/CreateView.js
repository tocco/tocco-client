import React, {useState} from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import {intlShape} from 'react-intl'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {Prompt} from 'react-router'
import styled from 'styled-components'
import {theme, scale} from 'tocco-ui'

import {currentViewPropType} from '../../utils/propTypes'
import navigationStrategy from '../../utils/navigationStrategy'

const StyledEntityDetailAppWrapper = styled.div`
  margin: 0;
  background-color: ${theme.color('paper')};
  padding: 0 0 0 ${scale.space(0)};
  overflow: hidden;
  height: 100%;
`

const CreateView = props => {
  const {
    currentViewInfo,
    history,
    match,
    intl,
    dispatchEmittedAction
  } = props
  const {location} = history
  const stateDefaultValues = _get(location, 'state.defaultValues', [])
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
    ),
    ...stateDefaultValues
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
      navigationStrategy={navigationStrategy(history, match)}
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
