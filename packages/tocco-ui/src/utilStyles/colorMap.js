import _get from 'lodash/get'

import {shadeColor} from '../utilStyles'

const colorizeText = {
  shade0: ({theme}) => _get(theme, 'colors.text'),
  shade1: ({theme}) => shadeColor(_get(theme, 'colors.text'), 3),
  shade2: ({theme}) => shadeColor(_get(theme, 'colors.text'), 5),
  signal: ({theme, signal}) => _get(theme, `colors.signal.${signal}.text`)
}

const colorizeBorder = {
  shade0: ({theme}) => _get(theme, 'colors.paper'),
  shade1: ({theme}) => shadeColor(_get(theme, 'colors.paper'), 2),
  shade2: ({theme}) => shadeColor(_get(theme, 'colors.paper'), 5),
  signal: ({theme, signal}) => _get(theme, `colors.signal.${signal}.text`),
  transparent: ({theme}) => 'transparent'
}

export {colorizeBorder, colorizeText}
