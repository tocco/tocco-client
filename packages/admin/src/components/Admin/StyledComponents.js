import styled from 'styled-components'
import SlideMenu from 'react-burger-menu/lib/menus/slide'
import {theme} from 'tocco-ui'

const calcViewportHeight = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

calcViewportHeight()

window.addEventListener('resize', () => calcViewportHeight())

window.addEventListener('orientationchange', function() {
  // After orientationchange, add a one-time resize event
  const afterOrientationChange = function() {
    // POST-ORIENTATION CODE
    calcViewportHeight()
    // eslint-disable-next-line no-console
    console.log('orientation change')
    // Remove the resize event listener after it has executed
    window.removeEventListener('resize', afterOrientationChange)
  }
  window.addEventListener('resize', afterOrientationChange)
})

export const StyledWrapper = styled.div`
  display: grid;
  grid-template:
    'header header' auto
    'menu content' 1fr / auto 1fr;
  background-color: #fff;
  height: calc(var(--vh, 1vh) * 100);

  .bm-burger-button button:focus {
    outline: 0;
  }
`

export const StyledContent = styled.div`
  grid-area: content;
  background-color: ${theme.color('backgroundBody')};
  overflow: hidden;
  display: flex;
`
export const StyledMenu = styled(SlideMenu)`
  grid-area: menu;
`

export const burgerMenuStyles = {
  bmBurgerButton: {
    position: 'absolute',
    outline: '0',
    width: '24px',
    height: '24px',
    left: '17px',
    top: '10px'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    width: '16%',
    minWidth: '350px'
  },
  bmMenu: {
    background: '#fff',
    padding: '0 0 3rem 0',
    fontSize: '1.15em',
    overflow: 'hidden'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    height: '100%'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}
