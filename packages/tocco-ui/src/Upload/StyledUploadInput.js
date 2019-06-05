import styled from 'styled-components'

import {
  colorizeText,
  declareFont,
  scale,
  theme
} from '../utilStyles'

const StyledUploadInput = styled.div`
  ${declareFont()}
  cursor: ${props => props.readOnly ? 'not-allowed' : 'pointer'};
  background-color: ${theme.color('paper')};
  color: ${props => props.readOnly ? colorizeText.shade2(props) : colorizeText.shade0(props)};
  padding: ${scale.space(-2)} 0 0 0;
`

export default StyledUploadInput
