import styled from 'styled-components'

const declareInteraction = props => {
  if (props.interactive) {
    return `
      &:hover,
      &:focus {
        opacity: .7;
      }
    `
  }
}

const StyledPreview = styled.figure`
  && {
    vertical-align: top;
    display: inline-flex;
    flex-direction: column;
    align-items: center;

    > * {
      flex: 1 1 auto;
    }

    img {
      max-width: 100%;
      ${props => declareInteraction(props)}
    }

    figcaption {
      text-align: center;
    }
  }
`

export default StyledPreview
