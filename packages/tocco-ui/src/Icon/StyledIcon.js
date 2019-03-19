import {
  scale,
  design
} from '../utilStyles'

// Return a style object instead of a styled-component to omit an additional wrapper on FontAwesomeIcon.
const getSpacing = props => {
  let left = 0
  let right = 0

  const space = (props.dense) ? scale.space(props.theme, -4) : scale.space(props.theme, -3)

  if (props.position === design.position.APPEND || props.position === design.position.BETWEEN) {
    left = space
  }

  if (props.position === design.position.PREPEND || props.position === design.position.BETWEEN) {
    right = space
  }

  return {margin: `0 ${right} 0 ${left}`}
}

export default getSpacing
