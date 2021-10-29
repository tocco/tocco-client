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
  StyledSearchBoxWrapper
} from './StyledComponents'
import {ActionEntry, EntityExplorerEntry, MenuEntry, MenuChildrenWrapper} from './menuType'

const tabs = {
  MODULES: 'modules',
  SETTINGS: 'settings',
  SYSTEM: 'system',
  COMPLETE: 'complete'
}

const createMenuTypeMap = ({onClick, hasFilterApplied, preferencesPrefix}) => {
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
  visibleMenus
}) => {
  const inputEl = useRef(null)
  const navigationEl = useRef(null)
  const [filter, setFilter] = useState('')
  const hasFilterApplied = Boolean(filter)

  const modulesTypeMap = useMemo(() =>
    createMenuTypeMap({onClick, hasFilterApplied, preferencesPrefix: ''}), [onClick, hasFilterApplied])
  const settingsTypeMap = useMemo(() =>
    createMenuTypeMap({onClick, hasFilterApplied, preferencesPrefix: 'settings'}), [onClick, hasFilterApplied])
  const systemTypeMap = useMemo(() =>
    createMenuTypeMap({onClick, hasFilterApplied}), [onClick, hasFilterApplied])
  const completeTypeMap = useMemo(() =>
    createMenuTypeMap({onClick, hasFilterApplied}), [onClick, hasFilterApplied])

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
        <MenuTree items={modulesMenuTree} searchFilter={filter} typeMapping={modulesTypeMap}/>
      </StyledMenuWrapper>}
      {activeMenuTab === tabs.SETTINGS
      && <StyledMenuWrapper>
        <MenuTree items={settingsMenuTree} searchFilter={filter} typeMapping={settingsTypeMap}/>
      </StyledMenuWrapper>}
      {activeMenuTab === tabs.SYSTEM
      && <StyledMenuWrapper>
        <MenuTree items={systemMenuTree} searchFilter={filter} typeMapping={systemTypeMap}/>
      </StyledMenuWrapper>}
      {activeMenuTab === tabs.COMPLETE
      && <StyledMenuWrapper>
        <MenuTree items={completeMenuTree} searchFilter={filter} typeMapping={completeTypeMap} requireSearch={true}/>
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
