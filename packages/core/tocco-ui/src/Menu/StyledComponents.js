import styled, {css} from 'styled-components'

import {Button, declareFont, scale, theme, StyledScrollbar} from '../index'
import {interactiveStyling, isTouchDevice} from '../utilStyles'

export const StyledIconWrapper = styled.div`
  margin-left: ${scale.space(-1.7)};
  margin-right: -${scale.space(-2.1)};
`

export const StyledIconButtonWrapper = styled(Button)`
  padding-left: ${scale.space(-0.5)};
  padding-right: ${scale.space(-0.5)};
`

export const StyledPopperWrapper = styled.div`
  position: relative;
`

export const StyledPopper = styled.div`
  max-height: ${({rectBottom}) => `calc(100vh - ${rectBottom + 15}px)`}; // add 15px for small padding
  width: max-content;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${theme.color('paper')};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border: 1px solid ${theme.color('secondaryLight')};
  z-index: 9999999; /* higher than StyledModalHolder */
  ${StyledScrollbar}
`

export const StyledMenuItem = styled.div`
  min-width: 200px;
  max-width: 300px;
`

export const StyledItemLabel = styled.div`
  cursor: ${({hasOnClick}) => (hasOnClick ? 'pointer' : 'default')};
  ${declareFont()}
  ${interactiveStyling}
  /* increased padding on touchdevices */
  padding: ${isTouchDevice
    ? css`
        ${scale.space(-1.4)}
        ${scale.space(-0.5)}
      ${scale.space(-1.4)}
      `
    : css`
        ${scale.space(-2)}
        ${scale.space(-0.5)}
      ${scale.space(-2)}
      `}
    calc(${scale.space(-0.5)} + ${({level}) => (level || 0) * 5 + 'px'});
  font-weight: ${({isGroup}) => (isGroup ? theme.fontWeight('bold') : theme.fontWeight('regular'))};
  box-shadow: none;
`
