import _get from 'lodash/get'
import styled, {css} from 'styled-components'

import {shadeColor, scale, themeSelector, isTouchDevice} from '../utilStyles'

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

export const StyledIconWrapper = styled.span`
  font-size: ${scale.font(1)};

  /* only hide arrow on non-touch devices */
  ${!isTouchDevice &&
  css`
    opacity: 0;

    &:hover {
      color: ${themeSelector.color('secondaryLight')};
    }
  `}
`

const StyledPanelHeaderFooter = styled.div`
  && {
    background-color: #f2f2f2;
    display: flex;
    padding: ${({isFramed}) => (isFramed ? '4px 8px 4px 8px' : 0)};
    align-items: center;

    /* only apply arrow styles on non-touch devices */
    ${!isTouchDevice &&
    css`
      &:hover {
        cursor: pointer;

        ${StyledIconWrapper} {
          opacity: 1;
        }
      }
    `}
    > div {
      flex: 1 1 auto;
    }
    ${props => declareDivider(props)}
  }
`

export default StyledPanelHeaderFooter
