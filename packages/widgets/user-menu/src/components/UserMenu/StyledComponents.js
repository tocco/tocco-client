import styled from 'styled-components'
import {StyledButton as Button, scale} from 'tocco-ui'

export const StyledHeader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const StyledLabelWrapper = styled.span`
  width: 100%;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const StyledIconWrapper = styled.div`
  margin-left: ${scale.space(-1.7)};
  margin-right: -${scale.space(-2.1)};
`

export const StyledButton = styled(Button)`
  width: 100%;
  margin: 0;
  padding-left: 3px;
  padding-right: 3px;
`
