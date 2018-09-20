import styled from 'styled-components'
import {theme} from 'styled-system'

import {StyledButton} from '../Button'

const declareDivider = props => {
  const cssShared = `
    &:first-child {
      border-bottom-color: ${theme('colors.base.fill.2')(props)};
      border-bottom-style: ${props.isFramed ? 'solid' : 'none'};
    }

    &:last-child,
    &:nth-child(3) {
      border-top-color: ${theme('colors.base.fill.2')(props)};
      border-top-style: ${props.isFramed ? 'solid' : 'none'};
    }
  `

  if (props.isOpen) {
    return `
      ${cssShared}
      &:first-child {
        border-bottom-width: 1px;
      }

      &:last-child,
      &:nth-child(3) {
        border-top-width: 1px;
      }
    `
  } else {
    return `
      ${cssShared}
      &:first-child {
        border-bottom-width: 0;
      }

      &:last-child {
        border-top-width: 0;
      }

      &:nth-child(3) {
        border-top-width: 1px;
      }
    `
  }
}

const StyledPanelHeaderFooter = styled.div`
  && {
    display: flex;
    padding: ${props => props.isFramed ? '15px' : 0};

    > div {
      flex: 1 1 auto;
    }

    ${StyledButton} {
      margin-left: auto;
      align-self: center;
    }

    ${props => declareDivider(props)}
    transition: border ${props => props.isOpen ? '300ms ease-in-out' : '1ms ease-in-out 299ms'};
    will-change: border;
  }
`
export default StyledPanelHeaderFooter
