import styled from 'styled-components'
import SlideMenu from 'react-burger-menu/lib/menus/slide'
import {theme} from 'tocco-ui'

import toccoLogo from '../Login/img/tocco-circle.svg'

export const StyledWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  grid-template-areas:
         "header header"
         "menu content";
  background-color: #fff;
  height: 100vh;
  
  .bm-burger-button button:focus {
    outline: 0;
  }
`

export const StyledContent = styled.div`
  grid-area: content;
  background-color: ${theme.color('background')};
  overflow: hidden;
`

export const StyledHeader = styled.div`
  grid-area: header;
  display: flex;
  height: 40px;
  background: #ffffff url(${toccoLogo}) no-repeat fixed -300px -900px;
  padding-right: 10px;
  padding-left: 40px;
`

export const StyledMenu = styled(SlideMenu)`
  grid-area: menu;
`

export const StyledConfig = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding-top: 7px;
`

export const burgerMenuStyles = {
  bmBurgerButton: {
    position: 'fixed',
    outline: '0',
    width: '24px',
    height: '24px',
    left: '13px',
    top: '9px',
    color: '#ffffff'
  },
  bmBurgerBars: {
    background: '#ffffff'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%'
  },
  bmMenu: {
    background: '#ffffff',
    padding: '0 0 2em 0',
    fontSize: '1.15em',
    overflow: 'hidden'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    height: '87%'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}
