import {theme} from 'styled-system'

import {stylingPosition} from '../utilStyles'

// Return a style object instead of a styled-component to omit an additional wrapper on FontAwesomeIcon.
const getSpacing = props => {
  let left = 0
  let right = 0

  const space = (props.dense) ? theme('space.1')(props) : theme('space.3')(props)

  if (props.position === stylingPosition.APPEND || props.position === stylingPosition.BETWEEN) {
    left = space
  }

  if (props.position === stylingPosition.PREPEND || props.position === stylingPosition.BETWEEN) {
    right = space
  }

  return {margin: `0 ${right} 0 ${left}`}
}

export default getSpacing
