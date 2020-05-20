import React, {useState} from 'react'
import PropTypes from 'prop-types'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {Prompt} from 'react-router'
import {intlShape} from 'react-intl'

import {goBack} from '../../../../utils/routing'
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

  const handleNavigateToCreate = relationName => {
    if (relationName) {
      props.history.push(`${props.match.url}/${relationName}/create`)
    } else {
      const entityBaseUrl = goBack(props.match.url, 2)
      props.history.push(entityBaseUrl + '/create')
    }
  }

  const handleEntityDeleted = () => {
    const entityBaseUrl = goBack(props.match.url, 2)
    props.history.push(entityBaseUrl)
  }

  const entityName = props.currentViewInfo.model.name
  const msg = id => props.intl.formatMessage({id})

  return (
    <React.Fragment>
      <Prompt
        when={touched}
        message={location => {
          if (props.history.location.pathname !== location.pathname) {
            return msg('client.entity-browser.detail.confirmTouchedFormLeave')
          }

          return false
        }}
      />
      <EntityDetailApp
        entityName={entityName}
        entityId={props.currentViewInfo.key}
        formName={entityName}
        mode={mode}
        emitAction={props.emitAction}
        onTouchedChange = {handleToucheChanged}
        linkFactory={{
          detail: (entity, relation, key, children) =>
            <StyledLink to={`/e/${entity}/${key}`} target="_blank">{children}</StyledLink>
        }}
        onNavigateToCreate={handleNavigateToCreate}
        onEntityDeleted={handleEntityDeleted}
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
