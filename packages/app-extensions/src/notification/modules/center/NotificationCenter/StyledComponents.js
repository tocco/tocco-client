import styled, {css} from 'styled-components'
import {theme, scale, StyledScrollbar, declareFont} from 'tocco-ui'

const typeColorMap = {
  warning: theme.color('signal.warning.text'),
  error: theme.color('signal.danger.text'),
  success: theme.color('signal.success.text'),
  info: theme.color('signal.info.text')
}

export const StyledNotification = styled.article`
  margin-bottom: ${scale.space(0)};
  padding: ${scale.space(-1)};
  ${({read}) => !read && css`
    background-color: ${theme.color('signal.info.paper')};
  `}
`

export const StyledNotificationHeader = styled.header`
  display: flex;
  align-items: baseline;
  margin-bottom: ${scale.space(-1)};

  * {
    margin-top: 0 !important;
    color: ${({notificationType}) => typeColorMap[notificationType]} !important;
  }
`

export const StyledIconWrapper = styled.span`
  display: inline-block;
  margin-right: ${scale.space(-1.5)};
`

export const StyledTimeStamp = styled.div`
  font-size: ${scale.font(-2)};
`

export const StyledNotificationCenter = styled.div`
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  width: inherit;
  padding: ${scale.space(-0.5)};
  background-color: ${theme.color('paper')};
  border: 1px solid ${theme.color('secondaryLight')};
  ${StyledScrollbar}
  ${declareFont()}
`
