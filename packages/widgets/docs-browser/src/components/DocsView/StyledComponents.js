import styled from 'styled-components'
import {scale} from 'tocco-ui'

export const StyledContentWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const StyledIconWrapper = styled.span`
  font-size: ${scale.font(1)};
  display: inline-block;
  margin-right: ${scale.space(-2)};
`
