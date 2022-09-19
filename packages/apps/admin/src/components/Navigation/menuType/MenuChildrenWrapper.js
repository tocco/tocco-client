import PropTypes from 'prop-types'

import {StyledMenuChildrenWrapper} from './StyledComponents'

const MenuChildrenWrapper = ({isOpen, canCollapse, children}) => (
  <StyledMenuChildrenWrapper isOpen={!canCollapse || isOpen} data-cy="menu-children-wrapper">
    {(!canCollapse || isOpen) && children}
  </StyledMenuChildrenWrapper>
)

MenuChildrenWrapper.propTypes = {
  menuTreePath: PropTypes.string.isRequired,
  canCollapse: PropTypes.bool.isRequired,
  children: PropTypes.any,
  isOpen: PropTypes.bool
}

export default MenuChildrenWrapper
