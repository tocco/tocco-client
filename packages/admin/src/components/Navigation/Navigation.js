import React, {useRef, useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import MenuTree from '../MenuTree'
import {StyledMenuEntry, StyledMenuLink, StyledNav, StyledSearch, StyledMewnuWrapper} from './StyledComponents'

const MenuMenuEntry = ({item}) => {
  return <StyledMenuEntry>{item.label}</StyledMenuEntry>
}

MenuMenuEntry.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string
  })
}

const EntityExplorerMenuEntry = ({onClick, item}) => {
  const entityNameDisplay = item.matchingAttribute === 'entity' ? <React.Fragment> ({item.entity})</React.Fragment> : ''

  return <StyledMenuLink onClick={onClick}
    to={`/e/${item.entity}`}>{item.label}{entityNameDisplay}
  </StyledMenuLink>
}

EntityExplorerMenuEntry.propTypes = {
  item: PropTypes.shape({
    entity: PropTypes.string,
    label: PropTypes.string,
    matchingAttribute: PropTypes.string
  }),
  onClick: PropTypes.func
}

const Navigation = ({menuItems, menuOpen, onClick}) => {
  const inputEl = useRef(null)
  const [filter, setFilter] = useState('')

  const map = {
    'menu': {
      component: MenuMenuEntry,
      filterAttributes: []
    },
    'entity-explorer': {
      component: EntityExplorerMenuEntry,
      props: {
        onClick
      },
      filterAttributes: ['label', 'entity']
    }
  }

  useEffect(() => {
    inputEl.current.select()
    inputEl.current.focus()
  }, [menuOpen])

  return <StyledNav>
    <StyledSearch placeholder="search" ref={inputEl} onChange={e => { setFilter(e.target.value) }}/>
    <StyledMewnuWrapper>
      <MenuTree items={menuItems} searchFilter={filter} typeMapping={map}/>
    </StyledMewnuWrapper>
  </StyledNav>
}

Navigation.propTypes = {
  menuItems: PropTypes.array,
  onClick: PropTypes.func,
  menuOpen: PropTypes.bool
}

export default Navigation
