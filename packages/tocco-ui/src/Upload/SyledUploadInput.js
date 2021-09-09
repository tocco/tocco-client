import styled from 'styled-components'
import Dropzone from 'react-dropzone'

import {StyledButton} from '../Button'
import {scale} from '../utilStyles'

export const StyledIconWrapper = styled.div`
  ${StyledButton} {
    position: relative;
    top: -${scale.space(-3.1)};
    margin: 0;
    border-radius: 50%;
    padding: ${scale.space(-1.5)} ${scale.space(-2)};
  }
`

export const StyledDropzone = styled(Dropzone)`
  position: relative;
  display: flex;
  justify-content: flex-end;
`
