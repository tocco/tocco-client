import styled from 'styled-components'
import {scale} from 'tocco-ui'

export const StyledAdvancedSearchButtonWrapper = styled.div``

export const StyledAdvancedSearch = styled.div`
  && {
    > *:not(:last-child) {
      margin-bottom: ${scale.space(-1)};
    }
  }
`
