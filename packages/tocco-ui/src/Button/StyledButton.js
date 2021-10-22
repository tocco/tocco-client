import styled, {css} from 'styled-components'

import {declareFont, design, interactiveStyling, scale, theme as themeSelector} from '../utilStyles'

const declareIconPosition = ({icon, pending, iconPosition}) => {
  if (icon || pending) {
    if (iconPosition === design.position.APPEND) {
      return `
        > span {
          order: -1;
          margin-right: .5rem;
        }
       `
    }

    return `
      > span {
        margin-left: .5rem;
      }
      `
  }
}
const getDensityStyle = ({dense, theme}) =>
  dense
    ? css`
  line-height: ${themeSelector.lineHeight('dense')({theme})};
  padding: ${scale.space(-3.5)({theme})} ${scale.space(-1.5)({theme})};
`
    : null

const getIconOnlyStyle = ({iconOnly}) =>
  iconOnly
    ? css`
  padding: 0;
  margin: 0;
`
    : null

const transparentBackground = () => css`
  background: transparent;
`

const StyledButton = styled.button`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  border: none;
  border-radius: ${themeSelector.radii('medium')};
  margin-right: .5em;
  padding: .3rem 1.3rem;
  cursor: pointer;
  height: fit-content;
  ${declareFont()}
  ${props => props.withoutBackground ? transparentBackground() : interactiveStyling(props)}
  ${props => getDensityStyle(props)}
  ${props => getIconOnlyStyle(props)}
  ${props => declareIconPosition(props)}

  & > span:first-child {
    margin-left: 0;
  }
`

export default StyledButton
