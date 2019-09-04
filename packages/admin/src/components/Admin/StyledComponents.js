import styled from 'styled-components'
import SlideMenu from 'react-burger-menu/lib/menus/slide'
import {StyledH1} from 'tocco-ui'

export const StyledTitle = styled(StyledH1)`
 && {
   color: white;
   padding-left: 8px;
   padding-top: 5px;
   font-size: 2.5rem;
 }
`

export const StyledWrapper = styled.div`
  display: grid;
  grid-template-rows: auto  1fr;
  grid-template-columns: auto 1fr;
  grid-template-areas:
         "header header"
         "menu content";
  background-color: #fff;
  color: #444;
  height: 100vh;
`

export const StyledContent = styled.div`
  grid-area: content;
  background-color: #edf1f5;
  overflow: hidden;
`

export const StyledHeader = styled.div`
  grid-area: header;
  display: flex;
  height: 40px;
  background: #9E2124;
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
    width: '16px',
    height: '16px',
    left: '16px',
    top: '13px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%'
  },
  bmMenu: {
    background: '#253653',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
    height: '90%'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}
