import styled from 'styled-components'

import {declareFont, scale} from '../utilStyles'
import {StyledSpan} from '../Typography'
import {StyledIconToccoWrapper} from '../LoadingSpinner'

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
    text-align: center;
    display: block;

    ${StyledIconToccoWrapper} {
      display: inline-block;
      height: ${scale.font(-1)};
      width: ${scale.font(-1)};
    }
  }
`
