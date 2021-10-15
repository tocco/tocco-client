import styled from 'styled-components'
import {colorizeText, StyledLayoutContainer, StyledLayoutBox, StyledSpan, theme, scale} from 'tocco-ui'
import {declareNoneWrappingText} from 'tocco-ui/src/utilStyles'

export const StyledFooterWrapper = styled.div`
  && {
    * {
      color: ${colorizeText.shade2};
      font-size: ${scale.font(-0.8)};
    }

    ${StyledLayoutBox} {
      margin-bottom: ${scale.space(-1)};
    }

    ${StyledLayoutContainer} {
      padding-right: 0;
    }
  }
`

export const StyledFooterItemWrapper = styled.div`
  display: flex;
`
export const StyledFooterItemLabel = styled(StyledSpan)`
  && {
    margin-right: ${scale.space(-1.37)};
    font-weight: ${theme.fontWeight('bold')};
    ${declareNoneWrappingText}
  }
`

export const StyledFooterItemValue = styled.span`
  flex: 1;
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
