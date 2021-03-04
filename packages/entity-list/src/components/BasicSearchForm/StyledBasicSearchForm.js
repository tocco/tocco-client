import styled from 'styled-components'
import {StyledLayoutBox, StyledScrollbar} from 'tocco-ui/src/Layout'

export const StyledBasicSearchForm = styled.div`
  ${StyledScrollbar}

  && {
    ${StyledLayoutBox} {
      padding-bottom: 0;
    }
  }

  //restrict height only in modal
  .tocco-notifier & {
    max-height: 200px;
    overflow-y: auto;
    padding-right: .5rem;
  }
`

export const StyledSearchFormButtons = styled.div`
  && {
    width: 100%;
    text-align: center;
  }
`
