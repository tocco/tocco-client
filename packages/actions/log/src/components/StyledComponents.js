import styled from 'styled-components'
import {theme, declareFont, scale} from 'tocco-ui'

export const StyledContainer = styled.div`
  background-color: ${theme.color('paper')};
  display: flex;
  justify-content: center;
  height: 100vh;
  padding: 0;
`

export const StyledHeader = styled.div`
  display: flex;
  justify-content: end;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`

export const StyledLogWrapper = styled.div`
  margin-top: ${scale.space(1)};
  width: 90%;
`

export const StyledLogFileStatedValue = styled.div`
  align-self: center;
  flex: 4;
  padding-left: ${scale.space(-0.5)};
  padding-right: ${scale.space(-0.5)};
  min-width: 100px;

  @media (max-width: 600px) {
    align-self: stretch;
  }
`

export const StyledFileCountStatedValue = styled.div`
  align-self: center;
  flex: 1;
  padding-left: ${scale.space(-0.5)};
  padding-right: ${scale.space(-0.5)};
  min-width: 100px;

  @media (max-width: 600px) {
    align-self: stretch;
  }
`

export const StyledButtonItem = styled.div`
  align-self: center;
  text-align: center;
  flex: 1;
  padding-left: ${scale.space(-0.5)};
  padding-right: ${scale.space(-0.5)};

  @media (max-width: 600px) {
    align-self: stretch;
  }
`

export const StyledTextAreaItem = styled.div`
  align-self: center;
  text-align: start;
  padding-top: ${scale.space(1)};
  height: 100%;
`

export const StyledTextarea = styled.textarea`
  resize: none;
  margin: 0;
  min-height: 4em;
  width: 100%;
  height: 90%;
  box-sizing: border-box;
  background-color: transparent;
  border: 0;
  cursor: ${({immutable}) => (immutable ? 'not-allowed' : 'default')};
  min-width: 100%;
  outline: 0;
  padding: 0;
  padding-left: ${scale.space(-0.5)};
  padding-right: ${scale.space(-0.5)};
  ${() =>
    declareFont({
      color: theme.color('text')
    })}
  &::-ms-clear {
    display: none;
  }

  &::-webkit-clear-button {
    display: none;
  }

  &::-webkit-inner-spin-button {
    display: none;
  }

  &:disabled {
    -webkit-text-fill-color: ${theme.color('text')}; // Safari fix
    opacity: 1; // iOS fix
  }

  // allow pointer event only on touch devices
  @media (pointer: coarse) {
    pointer-events: ${({immutable}) => (immutable ? 'none' : 'auto')};
  }
`
