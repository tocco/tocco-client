import _omit from 'lodash/omit'
import PropTypes from 'prop-types'

import {StyledTether, StyledMenu} from './StyledComponents'

const Menu = props => {
  const {selectProps, children} = props

  return (
    <StyledTether
      attachment="top left"
      targetAttachment="bottom left"
      constraints={[
        {
          to: 'window',
          attachment: 'together'
        }
      ]}
      renderTarget={ref => <div ref={ref} />}
      renderElement={ref => (
        <div ref={ref}>
          <StyledMenu
            {..._omit(props, ['innerRef'])}
            wrapperWidth={selectProps.wrapperWidth}
            wrapperHeight={selectProps.wrapperHeight}
          >
            {children}
          </StyledMenu>
        </div>
      )}
    />
  )
}

Menu.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.shape({
    wrapperHeight: PropTypes.number,
    wrapperWidth: PropTypes.number
  })
}

export default Menu
