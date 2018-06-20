import styled from 'styled-components'
import {theme} from 'styled-system'

import {StyledIcon} from '../Icon'
import {StyledSpan} from '../Typography/StyledTypography'

const StyledLoadMask = styled.div`
  && {
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    justify-content: center;
    padding: ${theme('space.4')}
    width: 100%;

    > ${StyledSpan} {
      text-align: center;
    }

    > ${StyledIcon} {
      font-size: ${theme('fontSizes.5')};
      margin-bottom: ${theme('space.4')}
      text-align: center;
    }
  }
`

export default StyledLoadMask
