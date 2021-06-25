import styled from 'styled-components'
import {scale, theme} from 'tocco-ui'
import declareFont from 'tocco-ui/src/utilStyles/declareFont'

export const StyledMergeErrorWrapper = styled.div`
  ${declareFont()}
  padding: ${scale.space(-1)} 0 0 ${scale.space(0)};
`

export const StyledSummaryErrorWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: ${scale.font(10)} 1fr;
  grid-column-gap: ${scale.space(-0.5)};
  margin-bottom: ${scale.space(-0.7)};
`

export const StyledIconWrapper = styled.span`
  display: flex;
  align-items: center;
  color: ${theme.color('signal.danger.text')};
  font-size: ${scale.font(10)};
`

export const StyledError = styled.p``

export const StyledLabelWrapper = styled.div`
  display: flex;
  align-items: center;

  label {
    vertical-align: bottom;
  }
`

export const StyledTableWrapper = styled.div`
  flex: 1;
`

export const StyledStatusWrapper = styled.span`
  color: ${({isChecked}) => isChecked
    ? theme.color('signal.success.text')
    : theme.color('signal.danger.text')};
`
