import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'tocco-ui'
import {injectIntl} from 'react-intl'

import {isValidSelection, selectionText} from './selectionHelper'

export const SingleAction = ({
  definition,
  onClick,
  selectedCount,
  disabled,
  intl
}) => <Button
    iconOnly={definition.buttonType === 'ICON'}
    data-cy={`action-${definition.id}`}
    look={definition.buttonType === 'ICON' ? 'flat' : 'raised'}
    withoutBackground={definition.buttonType === 'ICON'}
    onClick={e => {
      onClick(definition)
      e.stopPropagation()
    }}
    icon={definition.icon}
    label={getLabel(definition)}
    title={getTitle(selectedCount, definition, intl)}
    disabled={definition.readonly === true || !isValidSelection(selectedCount, definition) || disabled}
  />

const getLabel = definition => definition.label && shouldUseLabel(definition) ? definition.label : ''

const getTitle = (selectedCount, definition, intl) => selectionText(selectedCount, definition, intl)
  || (!shouldUseLabel(definition) ? definition.label : '')

const shouldUseLabel = definition => !(definition.useLabel === 'NO' || definition.useLabel === 'HIDE')

SingleAction.propTypes = {
  intl: PropTypes.object.isRequired,
  definition: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  selectedCount: PropTypes.number,
  disabled: PropTypes.bool
}

export default injectIntl(SingleAction)
