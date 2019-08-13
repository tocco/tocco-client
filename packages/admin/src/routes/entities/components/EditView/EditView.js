import React, {useState} from 'react'
import PropTypes from 'prop-types'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {Prompt} from 'react-router'
import {intlShape} from 'react-intl'

import StyledLink from '../../../../components/StyledLink/StyledLink'

const EditView = props => {
  const [touched, setTouched] = useState(false)
  const mode = 'update'

  if (!props.currentViewInfo || props.currentViewInfo.location !== props.history.location.pathname) {
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
        emitAction={props.emitAction}
        onTouchedChange = {handleToucheChanged}
        linkFactory={{
          detail: (entity, relation, key, children) =>
            <StyledLink to={`/e/${entity}/${key}`} target="_bank">{children}</StyledLink>
        }}
      />
    </React.Fragment>
  )
}

EditView.propTypes = {
  intl: intlShape,
  match: PropTypes.object,
  history: PropTypes.object,
  currentViewInfo: PropTypes.object,
  emitAction: PropTypes.func.isRequired
}

export default EditView
