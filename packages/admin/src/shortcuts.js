import {toggleMenuOpen, setActiveMenuTab, setVisibleMenus} from './modules/navigation/actions'

export default [
  {
    ctrl: true,
    key: 'm',
    actions: [toggleMenuOpen(), setVisibleMenus('main'), setActiveMenuTab('modules')],
    global: true
  },
  {
    ctrl: true,
    key: 'n',
    actions: [toggleMenuOpen(), setVisibleMenus('main'), setActiveMenuTab('settings')],
    global: true
  },
  {
    ctrl: true,
    alt: true,
    key: 'o',
    actions: [toggleMenuOpen(), setVisibleMenus('additional'), setActiveMenuTab('complete')],
    global: true
  }
]
