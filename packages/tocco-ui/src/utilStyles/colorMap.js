import _get from 'lodash/get'

import {shadeColor} from '../utilStyles'

const colorizeText = {
  shade0: ({theme}) => _get(theme, 'colors.text'),
  shade1: ({theme}) => shadeColor(_get(theme, 'colors.text'), 3.5),
  shade2: ({theme}) => shadeColor(_get(theme, 'colors.text'), 5.5),
  signal: ({theme, signal}) => _get(theme, `colors.signal.${signal}.text`),
  hasValue: ({theme}) => _get(theme, 'colors.secondaryLight')
}

const colorizeBorder = {
  shade0: ({theme}) => _get(theme, 'colors.paper'),
  shade1: ({theme}) => shadeColor(_get(theme, 'colors.paper'), 2),
  shade2: ({theme}) => shadeColor(_get(theme, 'colors.paper'), 4),
  signal: ({theme, signal}) => _get(theme, `colors.signal.${signal}.text`),
  isDirty: ({theme}) => _get(theme, 'colors.secondaryLight'),
  transparent: () => 'transparent'
}

export {colorizeBorder, colorizeText}
