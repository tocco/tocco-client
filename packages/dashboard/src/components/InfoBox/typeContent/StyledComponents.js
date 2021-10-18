import styled from 'styled-components'
import {StyledScrollbar} from 'tocco-ui'

export const StyledInfoBoxContentWrapper = styled.div`
  flex: 1;
  ${({scrollable}) => scrollable && 'overflow: auto;'}
  ${StyledScrollbar}
`
