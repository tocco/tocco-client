import React, {useRef, useState, useEffect, useMemo} from 'react'
import PropTypes from 'prop-types'
import SearchBox from 'tocco-ui/src/SearchBox'

import MenuTree from '../MenuTree'
import {
  StyledTabsContainer,
  StyledNav,
  StyledMenuWrapper,
  StyledSearchBoxWrapper,
  StyledMenuButtonsWrapper,
  StyledMenuButton,
  StyledNavIconButton,
  StyledActiveTabLabel
} from './StyledComponents'
import {ActionEntry, EntityExplorerEntry, MenuEntry, MenuChildrenWrapper} from './menuType'
import {getCompleteMenuPreferences, menuTabs} from '../../utils/navigationUtils'

const createMenuTypeMap = ({
  onClick,
  hasFilterApplied,
  preferencesPrefix
}) => {
  const usePreferences = typeof preferencesPrefix !== 'undefined'
  const canCollapse = !hasFilterApplied && usePreferences

  return {
    'menu': {
      component: MenuEntry,
      childrenWrapperComponent: MenuChildrenWrapper,
      filterAttributes: ['label'],
      props: {
        preferencesPrefix,
        canCollapse
      }
    },
    'entity-explorer': {
      component: EntityExplorerEntry,
      childrenWrapperComponent: MenuChildrenWrapper,
      props: {
        onClick,
        preferencesPrefix,
        canCollapse
      },
      filterAttributes: ['label', 'entity']
    },
    'action': {
      component: ActionEntry,
      childrenWrapperComponent: MenuChildrenWrapper,
      props: {
        onClick,
        preferencesPrefix,
        canCollapse
      },
      filterAttributes: ['label']
    }
  }
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
  saveUserPreferences
}) => {
  const inputEl = useRef(null)
  const navigationEl = useRef(null)
  const [filter, setFilter] = useState('')
  const hasFilterApplied = Boolean(filter)
  const showMenu = !hasFilterApplied && [menuTabs.MODULES, menuTabs.SETTINGS].includes(activeMenuTab)

  const msg = id => intl.formatMessage({id})

  const menuTabsConfig = {
    [menuTabs.MODULES]: {
      items: modulesMenuTree,
      preferencesPrefix: '',
      label: msg('client.admin.navigation.modules'),
      icon: 'cube'
    },
    [menuTabs.COMPLETE]: {
      items: completeMenuTree,
      label: msg('client.admin.navigation.complete'),
      icon: 'chart-network'
    },
    [menuTabs.SETTINGS]: {
      items: settingsMenuTree,
      preferencesPrefix: 'settings',
      label: msg('client.admin.navigation.settings'),
      icon: 'cog'
    },
    [menuTabs.SYSTEM]: {
      items: systemMenuTree,
      label: msg('client.admin.navigation.system'),
      icon: 'laptop-code'
    }
  }

  const modulesTypeMap = useMemo(() =>
    createMenuTypeMap({
      onClick,
      hasFilterApplied,
      preferencesPrefix: menuTabsConfig[menuTabs.MODULES].preferencesPrefix
    }), [onClick, hasFilterApplied])
  const settingsTypeMap = useMemo(() =>
    createMenuTypeMap({
      onClick,
      hasFilterApplied,
      preferencesPrefix: menuTabsConfig[menuTabs.SETTINGS].preferencesPrefix
    }), [onClick, hasFilterApplied])
  const systemTypeMap = useMemo(() =>
    createMenuTypeMap({
      onClick,
      hasFilterApplied
    }), [onClick, hasFilterApplied])
  const completeTypeMap = useMemo(() =>
    createMenuTypeMap({
      onClick,
      hasFilterApplied
    }), [onClick, hasFilterApplied])

  useEffect(() => {
    if (menuOpen) {
      if (!activeMenuTab) {
        setActiveMenuTab(menuTabs.MODULES)
      }
      inputEl.current.select()
    }
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen) {
      if (inputEl.current) {
        inputEl.current.focus()
      }
    }
  }, [activeMenuTab, menuOpen])

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

  const handleExpandAll = () => {
    const {
      items,
      preferencesPrefix
    } = menuTabsConfig[activeMenuTab] || {}
    if (items && typeof preferencesPrefix !== 'undefined') {
      const preferences = getCompleteMenuPreferences(items, preferencesPrefix, false)
      saveUserPreferences(preferences)
    }
  }

  const handleCollapseAll = () => {
    const {
      items,
      preferencesPrefix
    } = menuTabsConfig[activeMenuTab] || {}
    if (items && typeof preferencesPrefix !== 'undefined') {
      const preferences = getCompleteMenuPreferences(items, preferencesPrefix, true)
      saveUserPreferences(preferences)
    }
  }

  const changeMenuTab = tab => {
    setActiveMenuTab(tab)
  }

  const MenuTabs = Object.keys(menuTabs)
    .map(key => menuTabs[key])
    .filter(menuTab => menuTabsConfig[menuTab].items?.length > 0)
    .map(menuTab => (
      <StyledNavIconButton
        key={menuTab}
        active={activeMenuTab === menuTab}
        onMouseDown={e => {
          changeMenuTab(menuTab)

          /**
           * Prevent floating label on search input jumping
           * up and down while switching between menu tabs.
           * This prevents loosing the focus when "clicking"
           * on the menu tab button.
           */
          e.preventDefault()
        }}
        title={menuTabsConfig[menuTab].label}
        icon={menuTabsConfig[menuTab].icon}
      />
    ))

  return (
    <StyledNav ref={navigationEl} onKeyDown={onKeyDown} data-cy="admin-nav">
      <StyledTabsContainer>
        <StyledActiveTabLabel>{menuTabsConfig[activeMenuTab]?.label}</StyledActiveTabLabel>
        <div>
          {MenuTabs}
        </div>
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
      <StyledMenuWrapper>
        {showMenu && <StyledMenuButtonsWrapper>
          <StyledMenuButton
            icon="chevron-double-down"
            type="button"
            onClick={handleExpandAll}
            title={msg('client.admin.navigation.expandAll')}
          />
          <StyledMenuButton
            icon="chevron-double-up"
            type="button"
            onClick={handleCollapseAll}
            title={msg('client.admin.navigation.collapseAll')}
          />
        </StyledMenuButtonsWrapper>}

        {activeMenuTab === menuTabs.MODULES
        && <MenuTree items={modulesMenuTree} searchFilter={filter} typeMapping={modulesTypeMap}/>}
        {activeMenuTab === menuTabs.SETTINGS
        && <MenuTree items={settingsMenuTree} searchFilter={filter} typeMapping={settingsTypeMap}/>}
        {activeMenuTab === menuTabs.SYSTEM
        && <MenuTree items={systemMenuTree} searchFilter={filter} typeMapping={systemTypeMap}/>}
        {activeMenuTab === menuTabs.COMPLETE
        && <MenuTree items={completeMenuTree} searchFilter={filter}
                     typeMapping={completeTypeMap} requireSearch={true}/>}
      </StyledMenuWrapper>
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
  saveUserPreferences: PropTypes.func,
  menuOpen: PropTypes.bool
}

export default Navigation
