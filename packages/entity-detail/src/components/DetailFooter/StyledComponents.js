import styled from 'styled-components'
import {colorizeText, StyledSpan, theme, scale, declareNoneWrappingText} from 'tocco-ui'

export const StyledFooterWrapper = styled.div`
  max-width: 650px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${scale.font(0)};
  margin-right: ${scale.font(0)};

  && {
    * {
      color: ${colorizeText.shade2};
      font-size: ${scale.font(-0.8)};
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
    margin-left: ${scale.space(-1.37)};
  }
`
