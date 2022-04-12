import {call} from 'redux-saga/effects'

import {loadUserWithLocale} from '../intl/intl'
import {getLongTerm} from './cache'
import rest from '../rest'

export function* hasInvalidCache() {
  const revisionChanged = yield call(rest.hasRevisionIdChanged)
    
  const cachedLocale = getLongTerm('session', 'locale')
  const cachedPrincipal = getLongTerm('session', 'principal')
    
  const userInfo = yield call(loadUserWithLocale)
  const {locale, username, businessUnitId} = userInfo
    
  const hasLocaleChanged = !cachedLocale || cachedLocale !== locale
  const hasPrincipalChanged = cachedPrincipal
    && (cachedPrincipal.currentBusinessUnit.id !== businessUnitId || cachedPrincipal.username !== username)
    
  return hasLocaleChanged || hasPrincipalChanged || revisionChanged
}
