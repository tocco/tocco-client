import styled, {css} from 'styled-components'

import {theme} from '../index'

export const StyledBurgerButton = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  cursor: pointer;

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: ${theme.color('paper')};
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;

    &:nth-child(1) {
      top: 0;
      transform-origin: left center;
    }

    &:nth-child(2) {
      top: 6.5px;
      transform-origin: left center;
    }

    &:nth-child(3) {
      top: 13.5px;
      transform-origin: left center;
    }
  }
  ${({isOpen}) =>
    isOpen &&
    css`
      span:nth-child(1) {
        transform: rotate(45deg);
        top: -3px;
        left: 0;
      }

      span:nth-child(2) {
        width: 0;
        opacity: 0;
      }

      span:nth-child(3) {
        transform: rotate(-45deg);
        top: 14.3px;
        left: 0;
      }
    `}
`
