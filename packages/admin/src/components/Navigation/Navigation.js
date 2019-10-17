import React, {useRef, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Button} from 'tocco-ui'

import MenuTree from '../MenuTree'
import {StyledTabsContainer, StyledMenuEntry, StyledMenuLink, StyledNav, StyledSearch, StyledMewnuWrapper}
  from './StyledComponents'

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

const ActionMenuEntry = ({onClick, item}) => {
  return <StyledMenuLink onClick={onClick} to={`/a/${item.name}`}>{item.label}</StyledMenuLink>
}

ActionMenuEntry.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string
  }),
  onClick: PropTypes.func
}

const tabs = {
  MODULES: 'modules',
  SETTINGS: 'settings'
}

const Navigation = ({modulesMenuTree, settingsMenuTree, menuOpen, onClick, activeMenuTab, setActiveMenuTab}) => {
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
    },
    'action': {
      component: ActionMenuEntry,
      props: {
        onClick
      },
      filterAttributes: ['label']
    }
  }

  useEffect(() => {
    if (menuOpen) {
      inputEl.current.select()
      inputEl.current.focus()
    }
  }, [menuOpen])

  return <StyledNav>
    <StyledTabsContainer>
      <Button
        title="Modules"
        ink={activeMenuTab === tabs.MODULES ? 'primary' : 'base'}
        onClick={() => setActiveMenuTab(tabs.MODULES)}
        icon="cubes"
      />
      <Button
        title="Settings"
        ink={activeMenuTab === tabs.SETTINGS ? 'primary' : 'base'}
        icon="cogs"
        onClick={() => setActiveMenuTab(tabs.SETTINGS)}
      />
    </StyledTabsContainer>
    <StyledSearch placeholder="search" ref={inputEl} onChange={e => { setFilter(e.target.value) }}/>
    {activeMenuTab === tabs.MODULES
    && <StyledMewnuWrapper>
      <MenuTree items={modulesMenuTree} searchFilter={filter} typeMapping={map}/>
    </StyledMewnuWrapper>}
    {activeMenuTab === tabs.SETTINGS
    && <StyledMewnuWrapper>
      <MenuTree items={settingsMenuTree} searchFilter={filter} typeMapping={map}/>
    </StyledMewnuWrapper>}
  </StyledNav>
}

Navigation.propTypes = {
  activeMenuTab: PropTypes.string.isRequired,
  settingsMenuTree: PropTypes.array,
  modulesMenuTree: PropTypes.array,
  onClick: PropTypes.func,
  setActiveMenuTab: PropTypes.func,
  menuOpen: PropTypes.bool
}

export default Navigation
