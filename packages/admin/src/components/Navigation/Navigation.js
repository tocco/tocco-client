import React, {useRef, useState, useEffect, useMemo} from 'react'
import PropTypes from 'prop-types'
import SearchBox from 'tocco-ui/src/SearchBox'
import {intlShape} from 'react-intl'

import MenuTree from '../MenuTree'
import {
  StyledTabsContainer,
  StyledMenuEntry,
  StyledMenuLink,
  StyledNav,
  StyledMenuWrapper,
  StyledNavButton
}
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
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func
}

const tabs = {
  MODULES: 'modules',
  SETTINGS: 'settings'
}

const Navigation = ({modulesMenuTree, settingsMenuTree, menuOpen, onClick, activeMenuTab, setActiveMenuTab, intl}) => {
  const inputEl = useRef(null)
  const [filter, setFilter] = useState('')

  const map = useMemo(() => ({
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
  }), [])

  useEffect(() => {
    if (menuOpen) {
      if (!activeMenuTab) {
        setActiveMenuTab(tabs.MODULES)
      }
      inputEl.current.select()
      inputEl.current.focus()
    }
  }, [menuOpen])

  const msg = id => intl.formatMessage({id})

  return <StyledNav>
    <StyledTabsContainer>
      <StyledNavButton
        active={activeMenuTab === tabs.MODULES}
        onClick={() => setActiveMenuTab(tabs.MODULES)}
        label={msg('client.admin.navigation.modules')}
      />
      <StyledNavButton
        active={activeMenuTab === tabs.SETTINGS}
        onClick={() => setActiveMenuTab(tabs.SETTINGS)}
        label={msg('client.admin.navigation.settings')}
      />
    </StyledTabsContainer>
    <SearchBox
      minInputLength={2}
      onSearch={setFilter}
      ref={inputEl}
      placeholder={msg('client.admin.navigation.searchBoxPlaceHolder')}
    />
    {activeMenuTab === tabs.MODULES
    && <StyledMenuWrapper>
      <MenuTree items={modulesMenuTree} searchFilter={filter} typeMapping={map}/>
    </StyledMenuWrapper>}
    {activeMenuTab === tabs.SETTINGS
    && <StyledMenuWrapper>
      <MenuTree items={settingsMenuTree} searchFilter={filter} typeMapping={map}/>
    </StyledMenuWrapper>}
  </StyledNav>
}

Navigation.propTypes = {
  intl: intlShape.isRequired,
  activeMenuTab: PropTypes.string.isRequired,
  settingsMenuTree: PropTypes.array,
  modulesMenuTree: PropTypes.array,
  onClick: PropTypes.func,
  setActiveMenuTab: PropTypes.func,
  menuOpen: PropTypes.bool
}

export default Navigation
