import {toggleShortcutMenu} from './modules/navigation/actions'

export default [
  {
    ctrl: true,
    alt: true,
    code: 'KeyM',
    actions: [toggleShortcutMenu('modules')],
    global: true
  },
  {
    ctrl: true,
    alt: true,
    code: 'KeyN',
    actions: [toggleShortcutMenu('settings')],
    global: true
  },
  {
    ctrl: true,
    alt: true,
    code: 'KeyO',
    actions: [toggleShortcutMenu('complete')],
    global: true
  }
]
