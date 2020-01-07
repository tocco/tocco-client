import styled from 'styled-components'

import ToccoLogo from '../../assets/tocco-circle.svg'

export const StyledHeader = styled.div`
  grid-area: header;
  display: flex;
  height: 40px;
  background: #ffffff url(${ToccoLogo}) no-repeat fixed -300px -900px;
  padding-right: 10px;
  padding-left: 40px;
`
export const StyledConfig = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding: 7px;
`
