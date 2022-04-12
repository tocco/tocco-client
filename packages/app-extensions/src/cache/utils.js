import {call} from 'redux-saga/effects'
import {intl, cache} from 'tocco-util'

import rest from '../rest'

export function* hasInvalidCache() {
  const revisionChanged = yield call(rest.hasRevisionIdChanged)

  const cachedLocale = cache.getLongTerm('session', 'locale')
  const cachedPrincipal = cache.getLongTerm('session', 'principal')

  const userInfo = yield call(intl.loadUserWithLocale)
  const {locale, username, businessUnitId} = userInfo

  const hasLocaleChanged = !cachedLocale || cachedLocale !== locale
  const hasPrincipalChanged =
    cachedPrincipal &&
    (cachedPrincipal.currentBusinessUnit.id !== businessUnitId || cachedPrincipal.username !== username)

  return hasLocaleChanged || hasPrincipalChanged || revisionChanged
}
