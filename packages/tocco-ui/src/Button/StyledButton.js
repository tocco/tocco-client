import styled, {css} from 'styled-components'

import {
  declareFont,
  design,
  scale,
  theme as themeSelector,
  interactiveStyling
} from '../utilStyles'

const declareIconPosition = props => {
  if (props.icon || props.pending) {
    const space = props.dense ? scale.space(-4)(props) : scale.space(-3)(props)
    if (props.iconPosition === design.position.APPEND) {
      return `
        > span {
          order: -1;
          margin-right: ${space};
        }
       `
    }

    return `
      > span {
        margin-left: ${space};
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
  box-sizing: border-box; //nice2 reset
  display: inline-flex;
  align-items: center;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  
  border: none;
  border-radius: ${themeSelector.radii('medium')};
  
  margin-right: ${scale.space(-3)};
  margin-left: ${scale.space(-3)};
  padding: ${scale.space(-3)} ${scale.space(-1)};
  
  cursor: pointer;
  

  ${declareFont()}
  ${interactiveStyling}
  ${props => getDensityStyle(props)}
  ${props => declareIconPosition(props)}
`

export default StyledButton
