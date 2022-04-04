import styled, {createGlobalStyle} from 'styled-components'
import {
  Button,
  scale, StyledTether,
  theme
} from 'tocco-ui'

export const basePadding = scale.space(0.5)

export const StyledModalContent = styled.div`
  position: relative;
  background-color: ${theme.color('paper')};
  box-shadow: 2px 2px 10px rgba(0, 0, 0, .4);
  padding: ${basePadding};
  max-height: 80vh;
  min-width: 350px;
  max-width: 700px;
  margin: auto;
  top: 10%;
  display: grid;
  grid-template-rows: [title] auto [message] 1fr;
`

export const StyledCloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 22px;
  opacity: .8;
  outline: none;
  position: absolute;
  right: ${basePadding};
  top: ${basePadding};
  padding: 0;

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
  z-index: 99999999;
`

export const StyledModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1; // lower than ExtJS modals and mask (must be able to open legacy ExtJS modals on top of our modals)
`

export const StyledPageOverlay = styled.div`
  background-color: rgba(50, 50, 50, .7);
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

export const GlobalTetherStyle = createGlobalStyle`
  ${StyledTether} {
    && {
      z-index: 9999999; // higher than StyledModalHolder
    }
  }
`
