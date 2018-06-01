import PropTypes from 'prop-types'
import React from 'react'
import _omit from 'lodash/omit'
import {COMPONENT_TYPE_ACTION_GROUP, modeFitsScopes} from '../actions'
import ActionGroup from './ActionGroup'
import SingleAction from './SingleAction'

const Action = ({definition, onClick, ids, entity, mode, callback}) => {
  if (!modeFitsScopes(mode, definition.scopes)) return null

  const ActionType = definition.componentType === COMPONENT_TYPE_ACTION_GROUP ? ActionGroup : SingleAction

  return (
    <span className="action" style={{marginBottom: '.5em', display: 'inline-block'}}>
      <ActionType
        definition={definition}
        onClick={definition => {
          onClick(_omit(definition, ['label']), entity, ids, callback)
        }}
        selectedCount={ids ? ids.length : 0}
      />
    </span>
  )
}

Action.propTypes = {
  definition: PropTypes.shape({
    type: PropTypes.string,
    useLabel: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.string,
    config: PropTypes.object
  }).isRequired,
  ids: PropTypes.array,
  entity: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  callback: PropTypes.func,
  mode: PropTypes.string
}

export default Action
