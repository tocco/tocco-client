import SlideMenu from 'react-burger-menu/lib/menus/slide'
import styled from 'styled-components'
import {theme} from 'tocco-ui'

const documentHeight = () => {
  const doc = document.documentElement
  const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  doc.style.setProperty('--doc-height', `${viewportHeight}px`)
}

documentHeight()
window.addEventListener('resize', () => documentHeight())

export const StyledWrapper = styled.div`
  display: grid;
  grid-template:
    'header header' auto
    'menu content' 1fr / auto 1fr;
  background-color: ${theme.color('paper')};
  height: var(--doc-height);

  .bm-menu-wrap {
    width: ${({width}) => (width <= 400 ? '100%' : '16%')} !important;
  }

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
    top: '12px',
    // Default z-index of button is 1000 which is higher than the mask of the legacy action modal windows (not good).
    // It seems like it doesn't need to be higher than 3, therefore we set it to 3.
    zIndex: 3
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    minWidth: '350px'
  },
  bmMenu: {
    background: '#fff',
    padding: '0 0 3rem 0',
    fontSize: '1.15em',
    overflow: 'hidden'
  },
  bmItemList: {
    height: '100%'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}
