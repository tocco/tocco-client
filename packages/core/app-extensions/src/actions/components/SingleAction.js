import PropTypes from 'prop-types'
import {injectIntl} from 'react-intl'
import {Button} from 'tocco-ui'

import {isValidSelection, selectionText} from './selectionHelper'

export const SingleAction = ({definition, onClick, selectedCount, disabled, intl}) => {
  const shouldUseLabel = def => !(def.useLabel === 'NO' || def.useLabel === 'HIDE')
  const isDisabled = definition.readonly === true || !isValidSelection(selectedCount, definition) || disabled
  const label = definition.label && shouldUseLabel(definition) ? definition.label : ''
  const title = selectionText(selectedCount, definition, intl) || (!shouldUseLabel(definition) ? definition.label : '')
  const handleClick = e => {
    onClick(definition)
    e.stopPropagation()
  }

  return (
    <Button
      iconOnly={definition.buttonType === 'ICON'}
      data-cy={`action-${definition.id}`}
      look={definition.buttonType === 'ICON' ? 'flat' : 'raised'}
      withoutBackground={definition.buttonType === 'ICON'}
      onClick={handleClick}
      icon={definition.icon}
      label={label}
      title={title}
      disabled={isDisabled}
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
