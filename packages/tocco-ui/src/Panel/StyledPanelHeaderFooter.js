import styled from 'styled-components'
import _get from 'lodash/get'

import {StyledButton} from '../Button'
import {shadeColor} from '../utilStyles'

const declareDivider = ({theme, isOpen, isFramed}) => {
  const cssShared = `
    &:first-child {
      border-bottom-color: ${shadeColor(_get(theme, 'colors.paper'), 1)};
      border-bottom-style: ${isFramed ? 'solid' : 'none'};
    }

    &:last-child,
    &:nth-child(3) {
      border-top-color: ${shadeColor(_get(theme, 'colors.paper'), 1)};
      border-top-style: ${isFramed ? 'solid' : 'none'};
    }
  `

  if (isOpen) {
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
    padding: ${({isFramed}) => isFramed ? '4px 8px 4px 8px' : 0};
    align-items: center;

    &:hover {
      cursor: pointer;
    }

    > div {
      flex: 1 1 auto;
    }

    ${StyledButton} {
      margin-left: auto;
      align-self: center;
    }
    ${props => declareDivider(props)}
    transition: border ${({isOpen}) => isOpen ? '300ms ease-in-out' : '1ms ease-in-out 299ms'};
    will-change: border;
  }
`
export default StyledPanelHeaderFooter
