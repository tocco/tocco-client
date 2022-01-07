import styled from 'styled-components'
import {scale, StyledCode} from 'tocco-ui'

export const StyledWidgetCode = styled(StyledCode)`
  && {
    white-space: pre;
    padding: ${scale.space(0.3)};
  }
`

export const StyledButtonWrapper = styled.div`
  margin-top: ${scale.space(0.6)};
  display: flex;
  justify-content: flex-end;
`
