import {css} from 'styled-components'

import {declareFont, design, interactiveStyling, scale, theme as themeSelector} from '../utilStyles'
import {LabelVisibility} from './ButtonContext'
import {StyledLabelWrapper} from './StyledButton'

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

const getRemovedPaddingStyle = ({iconOnly, removePadding}) =>
  iconOnly || removePadding
    ? css`
        padding: 0;
        margin: 0;
      `
    : null

const transparentBackground = () => css`
  background: transparent;
`

export const buttonStyle = css`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  border: none;
  border-radius: ${themeSelector.radii('medium')};
  margin-right: ${scale.space(-1.38)};
  padding: ${scale.space(-2.1)} ${scale.space(0)};
  cursor: pointer;
  ${declareFont()}
  ${props => (props.withoutBackground ? transparentBackground() : interactiveStyling(props))}
  ${props => getDensityStyle(props)}
  ${props => getRemovedPaddingStyle(props)}
  ${props => declareIconPosition(props)}

  & > span:first-child {
    margin-left: 0;
  }
  ${({icon, labelVisibility}) => {
    const hideLabelStyles = `
      ${StyledLabelWrapper} {
        display: none;
      }
    `

    if (icon && labelVisibility === LabelVisibility.hidden) {
      return hideLabelStyles
    }

    return (
      icon &&
      labelVisibility === LabelVisibility.responsive &&
      `
    @media screen and (max-width: 1024px) {
      ${hideLabelStyles}
    }
  `
    )
  }}
`
