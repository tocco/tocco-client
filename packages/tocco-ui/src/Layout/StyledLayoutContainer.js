import styled from 'styled-components'

const declareStylesIfNestedCorrectly = props => {
  if (props.isNestedCorrectly) {
    return `
      display: flex;
      flex-wrap: wrap;

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
