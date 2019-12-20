import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {intlShape} from 'react-intl'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {Prompt} from 'react-router'

const CreateView = props => {
  const [touched, setTouched] = useState(false)

  const mode = 'create'

  if (!props.currentViewInfo) {
    return null
  }

  const {model, reverseRelation, key} = props.currentViewInfo
  const entityName = model.name

  const defaultValues = [
    ...((reverseRelation && key) ? [{id: reverseRelation, value: key}] : [])
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
    <React.Fragment>
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
    </React.Fragment>
  )
}

CreateView.propTypes = {
  intl: intlShape,
  match: PropTypes.object,
  history: PropTypes.object,
  currentViewInfo: PropTypes.object,
  dispatchEmittedAction: PropTypes.func.isRequired
}

export default CreateView
