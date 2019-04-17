import styled, {css, keyframes} from 'styled-components'

const delayScrollbar = keyframes`
  0%,
  100% {overflow-y: visible;}
`

const declareScrollbar = isOpen => {
  return isOpen ? css`
    animation-name: ${delayScrollbar};
    animation-duration: 300ms;
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
      height 300ms ease-in-out,
      padding 300ms ease-in-out;
      will-change: height, padding;

    > div {
      padding: ${props => props.isFramed ? '20px' : 0} 0;
    }
  }
`
export default StyledPanelBody
