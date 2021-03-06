
import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'tocco-ui'
import {injectIntl} from 'react-intl'

import {selectionText, isValidSelection} from './selectionHelper'

export const SingleAction = ({definition, onClick, selectedCount, disabled, intl}) => {
  const validSelection = isValidSelection(selectedCount, definition)
  const title = selectionText(selectedCount, definition, intl)
  return (
    <Button
      data-cy={`action-${definition.id}`}
      look="raised"
      onClick={e => {
        onClick(definition)
        e.stopPropagation()
      }}
      icon={definition.icon}
      {...definition.label && definition.useLabel === 'NO' ? {title: definition.label} : {label: definition.label}}
      {...(definition.readonly === true || !validSelection || disabled) && {disabled: true}}
      title={title}
    />
  )
}

SingleAction.propTypes = {
  intl: PropTypes.object.isRequired,
  definition: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  selectedCount: PropTypes.number,
  disabled: PropTypes.bool
}

export default injectIntl(SingleAction)
