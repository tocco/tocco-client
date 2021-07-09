import styled from 'styled-components'

import {Button, declareFont, scale, theme, StyledScrollbar} from '../index'
import {interactiveStyling} from '../utilStyles'

export const StyledIconWrapper = styled.div`
  margin-left: 4px;
  margin-right: -3px;
`

export const StyledIconButtonWrapper = styled(Button)`
  padding-left: .9rem;
  padding-right: .9rem;
`

export const StyledPopperWrapper = styled.div`
  position: relative;
`

export const StyledPopper = styled.div`
  max-height: ${({rectBottom}) => `calc(100vh - ${rectBottom + 15}px)`}; // add 15px for small padding
  overflow-y: auto;
  overflow-x: hidden;
  background: ${theme.color('paper')};
  box-shadow: 0 0 5px rgba(0, 0, 0, .3);
  border: 1px solid ${theme.color('secondaryLight')};
  z-index: 99999;
  ${StyledScrollbar}
`

export const StyledMenuItem = styled.div`
  min-width: 200px;
  max-width: 300px;
  background-color: ${theme.color('secondaryLight')};
`

export const StyledItemLabel = styled.div`
  cursor: ${({hasOnClick}) => hasOnClick ? 'pointer' : 'default'};
  ${declareFont()}
  ${interactiveStyling}
  padding:
    ${scale.space(-2)}
    ${scale.space(-0.5)}
    ${scale.space(-2)}
    calc(${scale.space(-0.5)} + ${({level}) => (level || 0) * 5 + 'px'});
  font-weight: ${({isGroup}) => isGroup ? theme.fontWeight('bold') : theme.fontWeight('regular')};
  box-shadow: none;
`
