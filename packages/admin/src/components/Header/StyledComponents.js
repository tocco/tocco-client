import styled from 'styled-components'

import ToccoLogo from '../../assets/tocco-circle.svg'

export const StyledHeader = styled.div`
  grid-area: header;
  display: flex;
  height: 40px;
  padding-right: 10px;
  padding-left: 40px;
`

export const StyledConfig = styled.div`
  flex: 1;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  padding: 7px;
`
export const StyledBackgroundLogo = styled.div`
  position: absolute;
  z-index: 1;
  height: 40px;
  width: 100%;
  background-color: ${({runEnv, theme}) => runEnv === 'TEST' ? theme.colors.secondary : theme.colors.primary};
  mask-image: url(${ToccoLogo});
  mask-repeat: no-repeat;
  mask-position: -300px -900px;
`
