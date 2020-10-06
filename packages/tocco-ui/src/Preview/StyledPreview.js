import styled from 'styled-components'

const declareInteraction = ({interactive}) => {
  if (interactive) {
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
    margin: revert; //reset css overwrite

    > * {
      flex: 1 1 auto;
    }

    img {
      max-width: ${({maxDimensionX}) => maxDimensionX || '100%'};
      max-height: ${({maxDimensionY}) => maxDimensionY || '100%'};
      ${props => declareInteraction(props)}
    }

    figcaption {
      text-align: center;
    }
  }
`

export default StyledPreview
