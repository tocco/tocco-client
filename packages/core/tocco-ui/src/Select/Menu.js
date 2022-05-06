import _omit from 'lodash/omit'
import PropTypes from 'prop-types'

import {StyledTether, StyledNonTether, StyledMenu} from './StyledComponents'

const Menu = props => {
  const {selectProps, children} = props
  const isMultiRemote = selectProps.isMulti && selectProps.hasAdvancedSearch
  const MenuComponent = (
    <StyledMenu
      {..._omit(props, ['innerRef'])}
      wrapperWidth={selectProps.wrapperWidth}
      wrapperHeight={selectProps.wrapperHeight}
    >
      {children}
    </StyledMenu>
  )

  return isMultiRemote ? (
    <StyledNonTether>{MenuComponent}</StyledNonTether>
  ) : (
    <StyledTether
      attachment="top left"
      targetAttachment="bottom left"
      constraints={[
        {
          to: 'scrollParent',
          attachment: 'together',
          pin: true
        },
        {
          to: 'window',
          attachment: 'together'
        }
      ]}
      renderTarget={ref => <div ref={ref} />}
      renderElement={ref => <div ref={ref}>{MenuComponent}</div>}
    />
  )
}

Menu.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.shape({
    wrapperHeight: PropTypes.number,
    wrapperWidth: PropTypes.number,
    isMulti: PropTypes.bool,
    hasAdvancedSearch: PropTypes.bool
  })
}

export default Menu
