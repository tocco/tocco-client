import styled from 'styled-components'
import {StyledScrollbar} from 'tocco-ui'

import {basePadding} from '../modules/modalComponents/StyledComponents'

export const StyledTitleWrapper = styled.div`
  padding-top: ${basePadding};
  padding-bottom: ${basePadding};
  grid-row-start: title;
`

export const StyledMessageWrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  grid-row-start: message;
  ${StyledScrollbar}

  ${StyledScrollbar} {
    padding-right: 1rem;
  }
`
