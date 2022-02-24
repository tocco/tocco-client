import _get from 'lodash/get'
import PropTypes from 'prop-types'
import {useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
// import {Prompt} from 'react-router'
import styled from 'styled-components'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {theme, scale} from 'tocco-ui'

import navigationStrategy from '../../utils/navigationStrategy'
import {currentViewPropType} from '../../utils/propTypes'

const StyledEntityDetailAppWrapper = styled.div`
  margin: 0;
  background-color: ${theme.color('paper')};
  padding: 0 0 0 ${scale.space(0)};
  overflow: hidden;
  height: 100%;
`

// TODO: @isbo fix prompt
const CreateView = props => {
  const {currentViewInfo, /* intl, */ chooseDocument, dispatchEmittedAction} = props
  const location = useLocation()
  const navigate = useNavigate()

  const stateDefaultValues = _get(location, 'state.defaultValues', [])
  // eslint-disable-next-line no-unused-vars
  const [touched, setTouched] = useState(false)

  const mode = 'create'

  if (!currentViewInfo) {
    return null
  }
  const {model, reverseRelation, parentKey} = currentViewInfo
  const entityName = model.name

  const isMultiReverseRelation = _get(model, `paths.${reverseRelation}.multi`, false)

  const defaultValues = [
    ...(reverseRelation && parentKey
      ? [{id: reverseRelation, value: isMultiReverseRelation ? [parentKey] : parentKey}]
      : []),
    ...stateDefaultValues
  ]

  const handleEntityCreated = ({id}) => {
    setTouched(false)
    navigate(`../${id}`)
  }

  // const msg = id => intl.formatMessage({id})
  const handleToucheChanged = ({touched: changedTouched}) => setTouched(changedTouched)

  return (
    <StyledEntityDetailAppWrapper>
      {/*       <Prompt when={touched} message={msg('client.entity-browser.detail.confirmTouchedFormLeave')} /> */}
      <EntityDetailApp
        entityName={entityName}
        formName={entityName}
        mode={mode}
        defaultValues={defaultValues}
        emitAction={action => {
          dispatchEmittedAction(action)
        }}
        navigationStrategy={navigationStrategy(navigate)}
        chooseDocument={chooseDocument}
        onEntityCreated={handleEntityCreated}
        onTouchedChange={handleToucheChanged}
      />
    </StyledEntityDetailAppWrapper>
  )
}

CreateView.propTypes = {
  intl: PropTypes.object,
  currentViewInfo: currentViewPropType,
  chooseDocument: PropTypes.func.isRequired,
  dispatchEmittedAction: PropTypes.func.isRequired
}

export default CreateView
