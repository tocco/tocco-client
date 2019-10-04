import styled from 'styled-components'
import {scale} from 'tocco-ui'
import {StyledButton} from 'tocco-ui/src/Button'
import {StyledButtonGroup} from 'tocco-ui/src/ButtonGroup'
import {StyledLayoutBox} from 'tocco-ui/src/Layout'

const StyledBasicSearchForm = styled.div`
  && {
    ${StyledLayoutBox} {
      padding-bottom: 0;
    }
  }
`

const StyledSearchFormButtonGroup = styled(StyledButtonGroup)`
  && {
    width: 100%;

    ${StyledButton}:not(:last-child) {
      margin-right: ${scale.space(-1)};
    }
  }
`

const StyledSearchFormButtonGroupGap = styled.div`
  && {
    flex-grow: 1;
  }
`

export {
  StyledBasicSearchForm,
  StyledSearchFormButtonGroup,
  StyledSearchFormButtonGroupGap
}
