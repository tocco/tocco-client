import _omit from 'lodash/omit'
import PropTypes from 'prop-types'
import React from 'react'

import {StyledTether, StyledMenu} from './StyledComponents'

const Menu = props => (
  <StyledTether
    attachment="top left"
    targetAttachment="bottom left"
    constraints={[
      {
        to: 'scrollParent',
        pin: true
      },
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
          wrapperWidth={props.selectProps.wrapperWidth}
          wrapperHeight={props.selectProps.wrapperHeight}
        >
          {props.children}
        </StyledMenu>
      </div>
    )}
  />
)

Menu.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.shape({
    wrapperHeight: PropTypes.number,
    wrapperWidth: PropTypes.number
  })
}

export default Menu
