import React, {useState} from 'react'
import PropTypes from 'prop-types'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {Prompt} from 'react-router'
import {intlShape} from 'react-intl'

const DetailView = props => {
  const [touched, setTouched] = useState(false)
  const mode = 'update'

  if (!props.currentViewInfo) {
    return null
  }

  const handleToucheChanged = ({touched}) => {
    setTouched(touched)
  }

  const entityName = props.currentViewInfo.model.name
  const msg = id => props.intl.formatMessage({id})

  return (
    <React.Fragment>
      <Prompt
        when={touched}
        message={msg('client.entity-browser.detail.confirmTouchedFormLeave')}
      />
      <EntityDetailApp
        entityName={entityName}
        entityId={props.currentViewInfo.key}
        formName={`${entityName}_detail`}
        mode={mode}
        emitAction={action => {
          props.dispatchEmittedAction(action)
        }}
        onTouchedChange = {handleToucheChanged}
      />
    </React.Fragment>
  )
}

DetailView.propTypes = {
  intl: intlShape,
  match: PropTypes.object,
  currentViewInfo: PropTypes.object,
  dispatchEmittedAction: PropTypes.func.isRequired
}

export default DetailView
