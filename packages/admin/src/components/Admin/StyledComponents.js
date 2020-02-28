import styled from 'styled-components'
import SlideMenu from 'react-burger-menu/lib/menus/slide'
import {theme} from 'tocco-ui'

export const StyledWrapper = styled.div`
  display: grid;
  grid-template:
    'header header' auto
    'menu content' 1fr / auto 1fr;
  background-color: #fff;
  height: 100vh;

  .bm-burger-button button:focus {
    outline: 0;
  }
`

export const StyledContent = styled.div`
  grid-area: content;
  background-color: ${theme.color('backgroundBody')};
  overflow: hidden;
`
export const StyledMenu = styled(SlideMenu)`
  grid-area: menu;
`

export const burgerMenuStyles = {
  bmBurgerButton: {
    position: 'fixed',
    outline: '0',
    width: '24px',
    height: '24px',
    left: '13px',
    top: '9px',
    color: '#fff'
  },
  bmBurgerBars: {
    background: '#fff'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%'
  },
  bmMenu: {
    background: '#fff',
    padding: '0 0 2em 0',
    fontSize: '1.15em',
    overflow: 'hidden'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    height: 'calc(100vh - 160px)'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}
