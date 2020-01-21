import styled from 'styled-components'
import {StyledLayoutBox} from 'tocco-ui/src/Layout'

const StyledBasicSearchForm = styled.div`
  && {
    ${StyledLayoutBox} {
      padding-bottom: 0;
    }
  }
`

const StyledSearchFormButtons = styled.div`
  && {
    width: 100%;
    text-align: right
  }
`

export {
  StyledBasicSearchForm,
  StyledSearchFormButtons
}
