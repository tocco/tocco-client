import React, {useRef, useState, useEffect, useMemo} from 'react'
import PropTypes from 'prop-types'
import SearchBox from 'tocco-ui/src/SearchBox'

import MenuTree from '../MenuTree'
import {
  StyledTabsContainer,
  StyledNav,
  StyledMenuWrapper,
  StyledNavSwitchButton,
  StyledNavButton,
  StyledSearchBoxWrapper,
  StyledMenuButtonsWrapper,
  StyledMenuButton
} from './StyledComponents'
import {ActionEntry, EntityExplorerEntry, MenuEntry, MenuChildrenWrapper} from './menuType'
import {getCompleteMenuPreferences} from '../../utils/navigationUtils'

const tabs = {
  MODULES: 'modules',
  SETTINGS: 'settings',
  SYSTEM: 'system',
  COMPLETE: 'complete'
}

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
  setVisibleMenus,
  visibleMenus,
  saveUserPreferences
}) => {
  const inputEl = useRef(null)
  const navigationEl = useRef(null)
  const [filter, setFilter] = useState('')
  const hasFilterApplied = Boolean(filter)
  const showMenu = !hasFilterApplied && [tabs.MODULES, tabs.SETTINGS].includes(activeMenuTab)

  const tabMenuMap = {
    [tabs.MODULES]: {
      items: modulesMenuTree,
      preferencesPrefix: ''
    },
    [tabs.SETTINGS]: {
      items: settingsMenuTree,
      preferencesPrefix: 'settings'
    },
    [tabs.SYSTEM]: {items: systemMenuTree},
    [tabs.COMPLETE]: {items: completeMenuTree}
  }

  const modulesTypeMap = useMemo(() =>
    createMenuTypeMap({
      onClick,
      hasFilterApplied,
      preferencesPrefix: tabMenuMap[tabs.MODULES].preferencesPrefix
    }), [onClick, hasFilterApplied])
  const settingsTypeMap = useMemo(() =>
    createMenuTypeMap({
      onClick,
      hasFilterApplied,
      preferencesPrefix: tabMenuMap[tabs.SETTINGS].preferencesPrefix
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

  const handleExpandAll = () => {
    const {
      items,
      preferencesPrefix
    } = tabMenuMap[activeMenuTab] || {}
    if (items && typeof preferencesPrefix !== 'undefined') {
      const preferences = getCompleteMenuPreferences(items, preferencesPrefix, false)
      saveUserPreferences(preferences)
    }
  }

  const handleCollapseAll = () => {
    const {
      items,
      preferencesPrefix
    } = tabMenuMap[activeMenuTab] || {}
    if (items && typeof preferencesPrefix !== 'undefined') {
      const preferences = getCompleteMenuPreferences(items, preferencesPrefix, true)
      saveUserPreferences(preferences)
    }
  }

  const setFocusToSearchInput = () => {
    if (inputEl.current) {
      inputEl.current.focus()
    }
  }

  const changeMenuTab = tab => {
    setActiveMenuTab(tab)
    setFocusToSearchInput()
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
              changeMenuTab(tabs.COMPLETE)
            }}
            icon={'chevron-right'}
            narrow={true}
          />
          <StyledNavButton
            active={activeMenuTab === tabs.MODULES}
            onClick={() => changeMenuTab(tabs.MODULES)}
            label={msg('client.admin.navigation.modules')}
          />
          <StyledNavButton
            active={activeMenuTab === tabs.SETTINGS}
            onClick={() => changeMenuTab(tabs.SETTINGS)}
            label={msg('client.admin.navigation.settings')}
          />
        </>}
        {visibleMenus === 'additional'
        && <>
          <StyledNavSwitchButton
            active={false}
            onClick={() => {
              setVisibleMenus('main')
              changeMenuTab(tabs.MODULES)
            }}
            icon={'chevron-left'}
            narrow={true}
          />
          <StyledNavButton
            active={activeMenuTab === tabs.SYSTEM}
            onClick={() => changeMenuTab(tabs.SYSTEM)}
            label={msg('client.admin.navigation.system')}
          />
          <StyledNavButton
            active={activeMenuTab === tabs.COMPLETE}
            onClick={() => changeMenuTab(tabs.COMPLETE)}
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

        {activeMenuTab === tabs.MODULES
        && <MenuTree items={modulesMenuTree} searchFilter={filter} typeMapping={modulesTypeMap}/>}
        {activeMenuTab === tabs.SETTINGS
        && <MenuTree items={settingsMenuTree} searchFilter={filter} typeMapping={settingsTypeMap}/>}
        {activeMenuTab === tabs.SYSTEM
        && <MenuTree items={systemMenuTree} searchFilter={filter} typeMapping={systemTypeMap}/>}
        {activeMenuTab === tabs.COMPLETE
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
  menuOpen: PropTypes.bool,
  visibleMenus: PropTypes.string,
  setVisibleMenus: PropTypes.func
}

export default Navigation
