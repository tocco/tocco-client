import PropTypes from 'prop-types'
import React from 'react'
import _omit from 'lodash/omit'

import componentTypes from '../actionComponentTypes'
import {modeFitsScopes} from '../actions'
import ActionGroup from './ActionGroup'
import SingleAction from './SingleAction'

const Action = ({definition, onClick, selection, parent, entity, mode, callback}) => {
  if (!modeFitsScopes(mode, definition.scopes)) return null

  const ActionType = definition.componentType === componentTypes.ACTION_GROUP ? ActionGroup : SingleAction

  return (
    <span className="action" style={{marginBottom: '.5em', display: 'inline-block'}}>
      <ActionType
        definition={definition}
        onClick={definition => {
          onClick(_omit(definition, ['label']), entity, selection, parent, callback)
        }}
        selectedCount={selection.count}
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
  selection: PropTypes.shape({
    mode: PropTypes.oneOf(['ID', 'QUERY']),
    payload: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    count: PropTypes.number
  }).isRequired,
  entity: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  callback: PropTypes.func,
  mode: PropTypes.string,
  parent: PropTypes.shape({
    key: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    reverseRelationName: PropTypes.string
  })
}

export default Action
