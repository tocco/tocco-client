import styled from 'styled-components'

import {declareFont, scale, theme} from '../utilStyles'

export const StyledWrapper = styled.div`
  ${declareFont()};
  background-color: ${({theme}) => theme.colors.signal.danger.text};
  color: ${theme.color('paper')};
  padding: ${scale.space(-0.5)};
`
