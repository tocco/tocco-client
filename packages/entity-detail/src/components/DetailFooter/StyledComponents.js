import styled from 'styled-components'
import {colorizeText, StyledLayoutBox, StyledSpan, theme} from 'tocco-ui'
import {declareNoneWrappingText} from 'tocco-ui/src/utilStyles'

export const StyledFooterWrapper = styled.div`
  && {
    * {
      color: ${colorizeText.shade2};
    }

    ${StyledLayoutBox} {
      margin-bottom: 0;
    }
  }
`

export const StyledFooterItemWrapper = styled.div`
  display: flex;
`
export const StyledFooterItemLabel = styled(StyledSpan)`
  && {
    margin-right: 5px;
    width: 80px;
    flex-shrink: 0;
    font-weight: ${theme.fontWeight('bold')};
    ${declareNoneWrappingText}
  }
`

export const StyledFooterItemValue = styled.span`
  width: 80%;
  flex-shrink: 1;
  flex-grow: 1;
  overflow: hidden;
`

export const StyledTimestampValueWrapper = styled.span`
  display: flex;
`

export const StyledTimestampRelativeValue = styled(StyledSpan)`
  && {
    margin-left: 5px;
  }
`
