import styled from 'styled-components'

import {declareFont, scale} from '../utilStyles'
import {StyledSpan} from '../Typography'

export const StyledUploadProgress = styled.div`
  && {
    padding-top: ${scale.space(-2)};
    text-align: center;
    display: inline-block;
  }
`

export const StyledUploadProgressText = styled(StyledSpan)`
  && {
    ${declareFont({fontSize: scale.font(-1)})}
  }
`

export const StyledUploadProgressIconAndText = styled.div`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    
    span {
      margin-left: ${scale.space(-2)}
    }
  }
`
