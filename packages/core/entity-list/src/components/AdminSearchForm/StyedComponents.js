import Split from 'react-split'
import styled from 'styled-components'
import {declareFont, Menu, scale, StyledScrollbar, theme} from 'tocco-ui'

export const StyledSplit = styled(Split)`
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
`

export const StyledSplitWrapper = styled.div`
  height: 100%;
`

export const Box = styled.div`
  background-color: ${theme.color('paper')};
  overflow-y: auto;
  padding: ${scale.space(-1.1)} ${scale.space(-0.375)} 0 ${scale.space(-1.1)};
  position: relative;

  &:first-of-type {
    z-index: 2; // higher than StyledTether to prevent cover on scroll
  }
  ${StyledScrollbar}
`

export const StyledGutter = styled.div`
  background-color: ${theme.color('paper')};
  display: flex;
  padding-top: 3px;
  justify-content: center;
  align-items: center;
  height: calc(100% - 1px); //subtract border height from total height
  font-size: 20px;
  border-top: 1px solid ${theme.color('backgroundBody')};
  position: relative;
  z-index: 2;

  &:hover {
    cursor: row-resize;
  }
`

export const StyledQueryBox = styled.div`
  height: 100%;
  background-color: ${theme.color('paper')};
  border-bottom: 3px solid ${theme.color('backgroundBody')};
  position: relative;
  z-index: 2; // higher than StyledTether to prevent cover on scroll
  overflow-y: auto;
  padding: ${scale.space(-1.1)} ${scale.space(-0.375)} 0 ${scale.space(-1.1)};

  ${Menu} {
    z-index: 3; //higher than rest to lay over query field
  }
  ${StyledScrollbar}
`

export const StyledErrorMessage = styled.pre`
  && {
    ${declareFont({
      fontFamily: theme.fontFamily('monospace')
    })}
    margin-left: ${scale.space(-1)};
    white-space: pre-wrap;
    word-break: break-word;
    color: ${theme.color('signal.danger.text')};
  }
`
