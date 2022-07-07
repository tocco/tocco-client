import PropTypes from 'prop-types'
import {react} from 'tocco-util'

import Link from '../../Link'
import {StyledEditableControl, StyledEditableWrapper} from '../StyledEditableValue'
import StyledStringEdit from './StyledStringEdit'

const EmailEdit = props => (
  <StyledEditableWrapper immutable={props.immutable}>
    <StyledStringEdit
      disabled={props.immutable}
      id={props.id}
      name={props.name}
      onChange={e => props.onChange(e.target.value)}
      immutable={props.immutable}
      value={props.value || ''}
    />
    {props.value && (
      <StyledEditableControl>
        <Link
          href={`mailto:${props.value.toString()}`}
          icon="envelope"
          look="ball"
          tabIndex={-1}
          target="_blank"
          neutral
        />
      </StyledEditableControl>
    )}
  </StyledEditableWrapper>
)

EmailEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
  immutable: PropTypes.bool
}

export default react.Debouncer(EmailEdit)
