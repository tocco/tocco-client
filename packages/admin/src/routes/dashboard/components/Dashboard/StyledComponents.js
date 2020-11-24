import styled from 'styled-components'
import {StyledH3, theme} from 'tocco-ui'

export const StyledDashBoardWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.color('backgroundBody')};
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  @media (max-width: 568px) {
    justify-content: center;
    align-items: center;
  }
`

export const StyledSlogan = styled.div`
  max-width: 900px;
  width: 100%;
  height: 100px;
  text-align: right;
  margin-bottom: 150px;
  margin-right: 100px;
  margin-left: 100px;

  @media (max-width: 568px) {
    margin-right: 25px;
    margin-left: 25px;
    margin-bottom: 0;
  }
`

export const StyledTitle = styled(StyledH3)`
  && {
    font-size: 3rem;
    color: ${theme.color('primary')};
  }
`

export const StyledLogo = styled.img`
  width: 100%;
  height: auto;
`
