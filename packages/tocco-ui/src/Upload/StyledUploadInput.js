import Dropzone from 'react-dropzone'
import styled from 'styled-components'

import {StyledButton} from '../Button'
import {colorizeText, declareFont, scale, theme} from '../utilStyles'

export const StyledDropzone = styled(Dropzone)`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`

export const StyledUploadInput = styled.div`
  ${declareFont()}
  cursor: ${({immutable}) => (immutable ? 'not-allowed' : 'pointer')};
  background-color: ${theme.color('paper')};
  color: ${props => (props.immutable ? colorizeText.shade2(props) : colorizeText.shade0(props))};
  padding: ${scale.space(-2)} 0 0 0;
  display: flex;

  ${StyledButton} {
    position: relative;
    top: -${scale.space(-3.1)};
    margin: 0;
    border-radius: 50%;
    padding: ${scale.space(-1.5)};
  }
`
