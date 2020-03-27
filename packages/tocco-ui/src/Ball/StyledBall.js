import styled, {css} from 'styled-components'

import {
  declareFont,
  interactiveStyling,
  scale, theme as themeSelector
} from '../utilStyles'

const declareBall = () => css`
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  padding: ${scale.space(-3)};
  // ensure that width has at least the size of height
  min-width: calc(1rem
  * ${themeSelector.fontSize('base')}
  * ${themeSelector.lineHeight('regular')}
  + 2.4 * ${scale.space(-3)});
`

export const StyledButton = styled.button`
  ${declareFont()}
  ${interactiveStyling}
  ${props => declareBall(props)}
`

export default StyledButton
