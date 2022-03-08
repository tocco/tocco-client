import _get from 'lodash/get'

import {getMenuPreferencesKey} from '../../utils/navigationUtils'

export const menuIsOpenPrefrencesSelector = (state, {canCollapse, preferencesPrefix, menuTreePath}) =>
  canCollapse
    ? !_get(state.preferences.userPreferences, getMenuPreferencesKey(preferencesPrefix, menuTreePath), true)
    : undefined
