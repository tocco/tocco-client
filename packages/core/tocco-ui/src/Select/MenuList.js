import PropTypes from 'prop-types'
import {components} from 'react-select'

import {StyledMoreOptionsAvailable} from './StyledComponents'

const MenuList = props => {
  const {selectProps, children, theme} = props
  const {moreOptionsAvailable, moreOptionsAvailableText} = selectProps
  return (
    <components.MenuList {...props} className="MenuList">
      {children}
      {moreOptionsAvailable && (
        <StyledMoreOptionsAvailable reactSelectTheme={theme}>{moreOptionsAvailableText}</StyledMoreOptionsAvailable>
      )}
    </components.MenuList>
  )
}

MenuList.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.shape({
    moreOptionsAvailable: PropTypes.bool,
    moreOptionsAvailableText: PropTypes.string
  }),
  theme: PropTypes.object
}

export default MenuList
