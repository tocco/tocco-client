import React, {useState} from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import {intlShape} from 'react-intl'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {Prompt} from 'react-router'
import styled from 'styled-components'

import {currentViewPropType} from '../../utils/propTypes'

const EntityDetailAppWrapper = styled.div`
  margin: 1rem 0 1rem 1rem;
`

const CreateView = props => {
  const [touched, setTouched] = useState(false)

  const mode = 'create'

  if (!props.currentViewInfo) {
    return null
  }

  const {model, reverseRelation, key} = props.currentViewInfo
  const entityName = model.name

  const isMultiReverseRelation = _get(model, `paths.${reverseRelation}.multi`, false)

  const defaultValues = [
    ...((reverseRelation && key)
      ? [{id: reverseRelation, value: isMultiReverseRelation ? [key] : key}]
      : []
    )
  ]

  const handleEntityCreated = ({id}) => {
    setTouched(false)
    props.history.push(props.match.url.replace(/create$/, id))
  }

  const handleToucheChanged = ({touched}) => {
    setTouched(touched)
  }

  const msg = id => props.intl.formatMessage({id})

  return (
    <EntityDetailAppWrapper>
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
          props.dispatchEmittedAction(action)
        }}
        onEntityCreated={handleEntityCreated}
        onTouchedChange={handleToucheChanged}
      />
    </EntityDetailAppWrapper>
  )
}

CreateView.propTypes = {
  intl: intlShape,
  match: PropTypes.object,
  history: PropTypes.object,
  currentViewInfo: currentViewPropType,
  dispatchEmittedAction: PropTypes.func.isRequired
}

export default CreateView
