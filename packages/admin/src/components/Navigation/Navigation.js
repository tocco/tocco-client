import React, {useRef, useState, useEffect} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import MenuTree from '../MenuTree'

const StyledInput = styled.input`
  border-radius: 20px;
  border: 0px;
  width: 90%;
  font-size: 1.2rem;
  padding: 4px 7px;
  :focus {
      outline: none;
  }
  margin-bottom: 5px;
`

const StyledMenuEntry = styled.span`
 color: #c5cbd4;
 font-weight: bold;
`

const StyledMenuLink = styled(Link)`
  color: #c5cbd4;
  text-decoration: none;
  
  &:hover {
      color: #555;
    }
  
  &:focus {
     text-decoration: underline;
      outline: none;
    }
  
  &.active {
      text-decoration: underline;
    }
`

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
    label: PropTypes.string
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

  return <nav>
    <StyledInput placeholder="search" ref={inputEl} onChange={e => { setFilter(e.target.value) }}/>
    <MenuTree items={menuItems} searchFilter={filter} typeMapping={map}/>
  </nav>
}

Navigation.propTypes = {
  menuItems: PropTypes.array,
  onClick: PropTypes.func,
  menuOpen: PropTypes.bool
}

export default Navigation
