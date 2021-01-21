import styled from 'styled-components'
import {scale, theme} from 'tocco-ui'

export const StyledMessageWrapper = styled.div`
  display: grid;
  grid-template-columns: 16% 1fr;
`

export const StyledIconWrapper = styled.span`
  display: flex;
  align-items: center;
  color: ${({isSuccessful}) => isSuccessful ? theme.color('signal.success.text') : theme.color('signal.danger.text')};
  font-size: ${scale.font(19)};
`

export const StyledTextWrapper = styled.div`
  display: flex;
  align-items: center;
`
