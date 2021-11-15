import {setActiveMenuTab, toggleShortcutMenu} from './modules/navigation/actions'

export default [
  {
    ctrl: true,
    alt: true,
    code: 'KeyM',
    actions: [toggleShortcutMenu('modules'), setActiveMenuTab('modules')],
    global: true
  },
  {
    ctrl: true,
    alt: true,
    code: 'KeyN',
    actions: [toggleShortcutMenu('settings'), setActiveMenuTab('settings')],
    global: true
  },
  {
    ctrl: true,
    alt: true,
    code: 'KeyO',
    actions: [toggleShortcutMenu('complete'), setActiveMenuTab('complete')],
    global: true
  }
]
