import styled, {css, keyframes} from 'styled-components'

const ANIMATION_DURATION = '300ms'

const delayScrollbar = keyframes`
  0%,
  99% {overflow-y: hidden;}
  100% {overflow-y: visible;}
`

const declareScrollbar = isOpen => {
  return isOpen ? css`
    animation-name: ${delayScrollbar};
    animation-duration: ${ANIMATION_DURATION};
    animation-fill-mode: forwards;
  ` : `
    overflow-y: hidden;
  `
}

const StyledPanelBody = styled.div`
  && {
    height: ${props => props.isOpen ? props.heightIfOpen : '0'};
    padding: 0 ${props => props.isFramed ? '15px' : 0};

    ${props => declareScrollbar(props.isOpen)}

    transition:
      height ${ANIMATION_DURATION} ease-in-out,
      padding ${ANIMATION_DURATION} ease-in-out;
      will-change: height, padding;

    > div {
      padding: ${props => props.isFramed ? '20px' : 0} 0;
    }
  }
`
export default StyledPanelBody
