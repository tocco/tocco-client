import PropTypes from 'prop-types'
import {useRef, useState} from 'react'
import {FormattedMessage, injectIntl} from 'react-intl'
import {EditableValue, StatedValue} from 'tocco-ui'
import {react as customHooks} from 'tocco-util'

import {StyledButton} from './StyledComponents'

const SearchFilterNameForm = ({intl, onSave}) => {
  const [name, setName] = useState('')

  const containerRef = useRef(null)
  customHooks.useAutofocus(containerRef)

  const msg = id => intl.formatMessage({id})

  return (
    <div ref={containerRef}>
      <StatedValue label={msg('client.entity-list.search.settings.saveAsFilter.nameLabel')}>
        <EditableValue type="string" value={name} events={{onChange: setName}} />
      </StatedValue>
      <StyledButton onClick={() => onSave(name)} look="raised" ink="primary" disabled={!name}>
        <FormattedMessage id="client.entity-list.search.settings.saveAsFilter.button" />
      </StyledButton>
    </div>
  )
}

SearchFilterNameForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired
}

export default injectIntl(SearchFilterNameForm)
