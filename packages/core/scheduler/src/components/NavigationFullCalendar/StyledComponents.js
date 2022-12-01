import styled from 'styled-components'
import {themeSelector, scale} from 'tocco-ui'

export const StyledNavigationFullCalendar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${scale.space(-0.8)};
  border-bottom: 3px solid ${themeSelector.color('backgroundBody')};

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
