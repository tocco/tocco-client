import styled from 'styled-components'
import {Button, scale, theme} from 'tocco-ui'

export const StyledButtonWrapper = styled.div`
  border-bottom: 3px solid ${theme.color('backgroundBody')};
`

export const StyledButton = styled(Button)`
  align-self: flex-start;
  margin-top: ${scale.space(-0.7)};
  margin-bottom: ${scale.space(-0.7)};
  margin-left: ${scale.space(0)};
`
