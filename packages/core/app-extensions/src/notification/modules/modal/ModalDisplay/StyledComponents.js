import styled, {createGlobalStyle, css} from 'styled-components'
import {Button, scale, StyledScrollbar, StyledTether, theme, isTouchDevice} from 'tocco-ui'

export const basePadding = scale.space(0.5)

export const StyledModalContent = styled.div`
  position: relative;
  background-color: ${theme.color('paper')};
  padding: ${basePadding};
  ${!isTouchDevice &&
  css`
    top: 10%;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
    max-height: 80vh;
    min-width: 350px;
    max-width: 700px;
    margin: auto;
  `}
  ${isTouchDevice &&
  css`
    box-sizing: border-box;
    height: 100vh;
    width: 100vw;
  `}
  display: grid;
  grid-template-rows: [header] auto [body] 1fr;
`

export const StyledCloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 22px;
  opacity: 0.8;
  outline: none;
  position: absolute;
  right: ${basePadding};
  top: ${basePadding};
  padding: 0;
  z-index: 1;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`

export const StyledModalHolder = styled.div`
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  // higher than StyledHeader and very high value to prevent other elements blocking it when implemented as a widget
  // lower than ext-js legacy actions
  z-index: 9000;
`

export const StyledModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1; // lower than ExtJS modals and mask (must be able to open legacy ExtJS modals on top of our modals)
`

export const StyledModalHeader = styled.div`
  grid-row-start: header;
`

export const StyledTitleWrapper = styled.div`
  padding-bottom: ${scale.space(0.5)};
`

export const StyledModalBody = styled.div`
  grid-row-start: body;
  overflow: hidden auto;
  padding-right: ${scale.space(0)};
  ${StyledScrollbar}
`

export const StyledMessageWrapper = styled.div`
  padding-bottom: ${scale.space(0)};
`

export const StyledPageOverlay = styled.div`
  background-color: rgba(50, 50, 50, 0.7);
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
`

export const StyledModalButton = styled(Button)`
  margin-top: ${scale.space(0)};

  &:last-child {
    margin-right: 0;
  }
`

export const StyledModalButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const GlobalStyles = createGlobalStyle`
  ${StyledTether} {
    && {
      z-index: 9999999; // higher than StyledModalHolder
    }
  }

  /* prevent scroll of background when modal is open */
  html,
  body {
    overflow-y: hidden;
  }
`
