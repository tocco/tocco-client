import styled from 'styled-components'
import {StyledLayoutBox, StyledScrollbar} from 'tocco-ui/src/Layout'

const StyledBasicSearchForm = styled.div`
  ${StyledScrollbar}

  && {
    ${StyledLayoutBox} {
      padding-bottom: 0;
    }
  }
  ${({disableSimpleSearch}) => !disableSimpleSearch && `
    max-height: 200px;
    overflow-y: auto;
    padding-right: .5rem;
  `
  }
`

const StyledSearchFormButtons = styled.div`
  && {
    width: 100%;
    text-align: center;
  }
`

export {
  StyledBasicSearchForm,
  StyledSearchFormButtons
}
