import styled from 'styled-components'
import {theme} from 'tocco-ui'

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
