import styled from 'styled-components'
import {theme} from 'styled-system'

import {
  stylingAnimation,
  stylingPosition
} from '../utilStyles'

const getSpacing = props => {
  let left = 0
  let right = 0

  const space = (props.dense) ? theme('space.1')(props) : theme('space.3')(props)
  const lineHeight = (props.dense || props.animation !== stylingAnimation.NONE)
    ? theme('lineHeights.0')(props)
    : theme('lineHeights.1')(props)

  if (props.position === stylingPosition.AFTER || props.position === stylingPosition.BETWEEN) {
    left = space
  }

  if (props.position === stylingPosition.BEFORE || props.position === stylingPosition.BETWEEN) {
    right = space
  }

  return `
    margin: 0 ${right} 0 ${left};
    line-height: ${lineHeight};
  `
}

const StyledIcon = styled.i`
  &&& {
    padding: 0;
    ${props => getSpacing(props)}
  }
`

export default StyledIcon
