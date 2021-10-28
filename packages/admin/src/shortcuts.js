import {toggleShortcutMenu} from './modules/navigation/actions'

export default [
  {
    ctrl: true,
    alt: true,
    code: 'KeyM',
    actions: [toggleShortcutMenu('main', 'modules')],
    global: true
  },
  {
    ctrl: true,
    alt: true,
    code: 'KeyN',
    actions: [toggleShortcutMenu('main', 'settings')],
    global: true
  },
  {
    ctrl: true,
    alt: true,
    code: 'KeyO',
    actions: [toggleShortcutMenu('additional', 'complete')],
    global: true
  }
]
