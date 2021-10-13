import styled from 'styled-components'
import {scale, theme} from 'tocco-ui'

export const StyledDashboardWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  background: ${theme.color('paper')};
  padding: ${scale.space(-0.5)};
`
export const StyledColumn = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`
