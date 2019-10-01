import {toggleMenuOpen, setActiveMenuTab} from './modules/navigation/actions'

export default [
  {
    ctrl: true,
    key: 'm',
    actions: [toggleMenuOpen(), setActiveMenuTab('modules')],
    global: true
  },
  {
    ctrl: true,
    key: 'n',
    actions: [toggleMenuOpen(), setActiveMenuTab('settings')],
    global: true
  }
]
