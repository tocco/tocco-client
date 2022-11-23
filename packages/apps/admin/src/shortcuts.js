import {setShortcutMenu} from './modules/navigation/actions'

export default [
  {
    ctrl: true,
    alt: true,
    code: 'KeyM',
    actions: [setShortcutMenu('modules')],
    global: true
  },
  {
    ctrl: true,
    alt: true,
    code: 'KeyN',
    actions: [setShortcutMenu('settings')],
    global: true
  },
  {
    ctrl: true,
    alt: true,
    code: 'KeyO',
    actions: [setShortcutMenu('complete')],
    global: true
  },
  {
    ctrl: true,
    alt: true,
    code: 'KeyK',
    actions: [setShortcutMenu('system')],
    global: true
  }
]
