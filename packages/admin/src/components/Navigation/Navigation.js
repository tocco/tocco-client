import React, {useRef, useState, useEffect, useMemo} from 'react'
import PropTypes from 'prop-types'
import SearchBox from 'tocco-ui/src/SearchBox'
import {Icon} from 'tocco-ui'

import MenuTree from '../MenuTree'
import {
  StyledTabsContainer,
  StyledMenuEntry,
  StyledMenuLink,
  StyledNav,
  StyledMenuWrapper,
  StyledNavSwitchButton,
  StyledNavButton,
  StyledSearchBoxWrapper,
  StyledStyledMenuLinkWrapper,
  StyledIconLink
}
  from './StyledComponents'

const MenuMenuEntry = ({item}) => (
  <StyledMenuEntry>
    {item.label}
  </StyledMenuEntry>
)

MenuMenuEntry.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string
  })
}

const EntityExplorerMenuEntry = ({
  onClick,
  item
}) => {
  const entityNameDisplay = item.matchingAttribute === 'entity' ? <> ({item.entity})</> : ''

  return (
    <StyledStyledMenuLinkWrapper>
      <StyledMenuLink data-quick-navigation={true} onClick={onClick} to={`/e/${item.entity}`}>
        {item.label}{entityNameDisplay}
      </StyledMenuLink>
      <StyledIconLink to={`/e/${item.entity}`} target="_blank" rel="noreferrer">
        <Icon icon="external-link"/>
      </StyledIconLink>
    </StyledStyledMenuLinkWrapper>
  )
}

EntityExplorerMenuEntry.propTypes = {
  item: PropTypes.shape({
    entity: PropTypes.string,
    label: PropTypes.string,
    matchingAttribute: PropTypes.string
  }),
  onClick: PropTypes.func
}

const ActionMenuEntry = ({
  onClick,
  item
}) => (
  <StyledStyledMenuLinkWrapper>
    <StyledMenuLink
      data-quick-navigation={true}
      onClick={onClick}
      to={`/e/action/${item.name}`}>
      {item.label}
    </StyledMenuLink>
    <StyledIconLink to={`/e/action/${item.name}`} target="_blank" rel="noreferrer">
      <Icon icon="external-link"/>
    </StyledIconLink>
  </StyledStyledMenuLinkWrapper>
)

ActionMenuEntry.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func
}

const tabs = {
  MODULES: 'modules',
  SETTINGS: 'settings',
  SYSTEM: 'system',
  COMPLETE: 'complete'
}

const Navigation = ({
  modulesMenuTree,
  settingsMenuTree,
  systemMenuTree,
  completeMenuTree,
  menuOpen,
  onClick,
  activeMenuTab,
  setActiveMenuTab,
  intl,
  setVisibleMenus,
  visibleMenus
}) => {
  const inputEl = useRef(null)
  const navigationEl = useRef(null)
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

  const handleCursorNavigation = key => {
    const focusableElements = navigationEl.current.querySelectorAll('a[data-quick-navigation="true"], input')
    const currentIdx = [...focusableElements].findIndex(el => document.activeElement.isEqualNode(el))

    if (currentIdx > -1) {
      const indexDiff = key === 'ArrowDown' ? 1 : focusableElements.length - 1
      const targetIdx = (currentIdx + indexDiff) % focusableElements.length
      focusableElements[targetIdx].focus()
    }
  }

  const onKeyDown = e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      handleCursorNavigation(e.key)
    }
  }

  return (
    <StyledNav ref={navigationEl} onKeyDown={onKeyDown} data-cy="admin-nav">
      <StyledTabsContainer>
        {visibleMenus === 'main'
        && <>
          <StyledNavSwitchButton
            active={false}
            onClick={() => {
              setVisibleMenus('additional')
              setActiveMenuTab(tabs.COMPLETE)
            }}
            icon={'chevron-right'}
            narrow={true}
          />
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
        </>}
        {visibleMenus === 'additional'
        && <>
          <StyledNavSwitchButton
            active={false}
            onClick={() => {
              setVisibleMenus('main')
              setActiveMenuTab(tabs.MODULES)
            }}
            icon={'chevron-left'}
            narrow={true}
          />
          <StyledNavButton
            active={activeMenuTab === tabs.SYSTEM}
            onClick={() => setActiveMenuTab(tabs.SYSTEM)}
            label={msg('client.admin.navigation.system')}
          />
          <StyledNavButton
            active={activeMenuTab === tabs.COMPLETE}
            onClick={() => setActiveMenuTab(tabs.COMPLETE)}
            label={msg('client.admin.navigation.complete')}
          />
        </>}
      </StyledTabsContainer>
      <StyledSearchBoxWrapper>
        <SearchBox
          minInputLength={2}
          onSearch={setFilter}
          ref={inputEl}
          placeholder={msg('client.admin.navigation.searchBoxPlaceHolder')}
          aria-label={msg('client.admin.navigation.searchBoxPlaceHolder')}
        />
      </StyledSearchBoxWrapper>
      {activeMenuTab === tabs.MODULES
      && <StyledMenuWrapper>
        <MenuTree items={modulesMenuTree} searchFilter={filter} typeMapping={map}/>
      </StyledMenuWrapper>}
      {activeMenuTab === tabs.SETTINGS
      && <StyledMenuWrapper>
        <MenuTree items={settingsMenuTree} searchFilter={filter} typeMapping={map}/>
      </StyledMenuWrapper>}
      {activeMenuTab === tabs.SYSTEM
      && <StyledMenuWrapper>
        <MenuTree items={systemMenuTree} searchFilter={filter} typeMapping={map}/>
      </StyledMenuWrapper>}
      {activeMenuTab === tabs.COMPLETE
      && <StyledMenuWrapper>
        <MenuTree items={completeMenuTree} searchFilter={filter} typeMapping={map} requireSearch={true}/>
      </StyledMenuWrapper>}
    </StyledNav>
  )
}

Navigation.propTypes = {
  intl: PropTypes.object.isRequired,
  activeMenuTab: PropTypes.string.isRequired,
  settingsMenuTree: PropTypes.array,
  modulesMenuTree: PropTypes.array,
  systemMenuTree: PropTypes.array,
  completeMenuTree: PropTypes.array,
  onClick: PropTypes.func,
  setActiveMenuTab: PropTypes.func,
  menuOpen: PropTypes.bool,
  visibleMenus: PropTypes.string,
  setVisibleMenus: PropTypes.func
}

export default Navigation
