import {darken} from 'polished'
import styled from 'styled-components'

import {StyledButton} from '../Button'
import {StyledSpan} from '../Typography'
import {colorizeText, declareFont, scale, themeSelector} from '../utilStyles'

export const StyledSection = styled.section`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`

export const StyledButtonsWrapper = styled.div`
  display: flex;
  align-items: center;

  ${StyledButton} {
    margin: 0;
    border-radius: 50%;
    padding: ${scale.space(-2)};

    a:hover {
      color: unset;
    }
  }
`

export const StyledDropzone = styled.div`
  width: 100%;

  &:hover {
    ${StyledButton} {
      background-color: ${({theme}) => darken(0.1, theme.colors.paper)};
    }
  }
`

export const StyledUploadInput = styled.div`
  ${declareFont()}
  cursor: ${({immutable}) => (immutable ? 'not-allowed' : 'pointer')};
  background-color: ${themeSelector.color('paper')};
  color: ${props => (props.immutable ? colorizeText.shade2(props) : colorizeText.shade0(props))};
  padding: ${scale.space(-2)} 0 0 0;
  display: flex;

  ${StyledButton} {
    float: right;
    position: relative;
    top: -${scale.space(-3.1)};
    margin: 0;
    border-radius: 50%;
    padding: ${scale.space(-1.5)};
  }
`

export const StyledUploadProgress = styled.div`
  && {
    padding-top: ${scale.space(-2)};
    text-align: center;
    display: inline-block;
  }
`

export const StyledUploadProgressText = styled(StyledSpan)`
  && {
    ${declareFont({fontSize: scale.font(-1)})}
  }
`

export const StyledUploadProgressIconAndText = styled.div`
  && {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      margin-left: ${scale.space(-2)};
    }
  }
`

export const StyledView = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: ${scale.space(-2)};
`
