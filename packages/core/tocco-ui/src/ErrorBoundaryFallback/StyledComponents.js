import styled from 'styled-components'

import {declareFont, scale, themeSelector} from '../utilStyles'

export const StyledWrapper = styled.div`
  ${declareFont()};
  background-color: ${({theme}) => theme.colors.signal.danger.text};
  color: ${themeSelector.color('paper')};
  padding: ${scale.space(-0.5)};
`
