import styled from 'styled-components'
import {scale} from 'tocco-ui'

export const StyledNavigationFullCalendar = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${scale.space(-1)} ${scale.space(-2)};

  > div {
    display: flex;
    align-items: center;
  }
`

export const StyledButtonGroupReloadWrapper = styled.div`
  && {
    display: grid;
    grid-template-columns: auto 40px;
  }
`

export const StyledReloadButtonWrapper = styled.div``
