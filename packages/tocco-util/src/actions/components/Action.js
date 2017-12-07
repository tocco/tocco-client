import PropTypes from 'prop-types'
import React from 'react'
import _omit from 'lodash/omit'
import {OLD_ACTION_TYPE, ACTION_GROUP_TYPE, modeFitsScopes} from '../actions'
import ActionGroup from './ActionGroup'
import SingleAction from './SingleAction'

const Action = ({definition, onClick, ids, entity, mode}) => {
  if (!modeFitsScopes(mode, definition.scopes)) return null

  if (definition.type === OLD_ACTION_TYPE) return null
  const ActionType = definition.type === ACTION_GROUP_TYPE ? ActionGroup : SingleAction

  return (
    <span className="action">
      <ActionType
        definition={definition}
        onClick={definition => {
          onClick(_omit(definition, ['label']), entity, ids)
        }}
      />
    </span>
  )
}

Action.propTypes = {
  definition: PropTypes.object.isRequired,
  ids: PropTypes.array,
  entity: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  mode: PropTypes.string
}

export default Action
