import styled, {css} from 'styled-components'

import {
  declareFont,
  design,
  scale,
  theme as themeSelector,
  interactiveStyling
} from '../utilStyles'

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
  ${interactiveStyling}
  ${props => getDensityStyle(props)}
  ${props => declareIconPosition(props)}

  & > span:first-child {
    margin-left: 0;
  }
`

export default StyledButton
