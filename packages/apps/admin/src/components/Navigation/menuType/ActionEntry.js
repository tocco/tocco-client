import PropTypes from 'prop-types'
import {Icon} from 'tocco-ui'

import {StyledIconLink, StyledMenuLink, StyledMenuLinkWrapper} from './StyledComponents'

const ActionEntry = ({onClick, item}) => (
  <StyledMenuLinkWrapper>
    <StyledMenuLink data-quick-navigation={true} onClick={onClick} to={`/e/action/${item.name}`}>
      {item.label}
    </StyledMenuLink>
    <StyledIconLink to={`/e/action/${item.name}`} target="_blank" rel="noreferrer">
      <Icon icon="external-link" />
    </StyledIconLink>
  </StyledMenuLinkWrapper>
)

ActionEntry.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func
}

export default ActionEntry
