import styled from 'styled-components'

const declareStylesIfNestedCorrectly = ({isNestedCorrectly}) => {
  if (isNestedCorrectly) {
    return `
      display: flex;
      flex-wrap: wrap;

      &:last-child {
        margin-bottom: 0;
        flex: 1;
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
