import PropTypes from 'prop-types'

import {StyledChildrenWrapper} from './StyledComponents'

const ChildrenWrapper = ({children, onOpen}) => (
  <StyledChildrenWrapper onClick={onOpen}>{children}</StyledChildrenWrapper>
)

ChildrenWrapper.propTypes = {
  children: PropTypes.any,
  onOpen: PropTypes.func
}

export default ChildrenWrapper
