import styled from 'styled-components'
import {theme} from 'styled-system'

const declareStylesIfNestedCorrectly = props => {
  if (props.isNestedCorrectly) {
    return `
      display: flex;
      flex-wrap: wrap;
      margin: 0 -${theme('space.4')(props)};
      margin: 0 -15px;

      &:last-child {
        margin-bottom: 0;
      }
    `
  } else {
    return `
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    `
  }
}

const StyledLayoutContainer = styled.div`
  ${props => declareStylesIfNestedCorrectly(props)}
`

export default StyledLayoutContainer
