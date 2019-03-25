
import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'tocco-ui'
import {intlShape} from 'react-intl'

import {selectionText, isValidSelection} from './selectionHelper'

const SingleAction = ({definition, onClick, selectedCount, disabled}, context) => {
  const validSelection = isValidSelection(selectedCount, definition)
  const title = selectionText(selectedCount, definition, context.intl)

  return (
    <Button
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

SingleAction.contextTypes = {
  intl: intlShape
}

SingleAction.propTypes = {
  definition: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  selectedCount: PropTypes.number,
  disabled: PropTypes.bool
}

export default SingleAction
