import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {intl, cache} from 'tocco-util'

import rest from '../rest'
import {hasInvalidCache} from './utils'

describe('app-extensions', () => {
  describe('cache', () => {
    describe('utils', () => {
      describe('hasInvalidCache', () => {
        beforeEach(() => {
          cache.clearAll()
        })

        afterEach(() => {
          cache.clearAll()
        })

        test('should return valid if nothing has changed', () => {
          const userInfo = {
            locale: 'de',
            username: 'hans',
            businessUnitId: 'test'
          }

          cache.addLongTerm('session', 'principal', {currentBusinessUnit: {id: 'test'}, username: 'hans'})
          cache.addLongTerm('session', 'locale', 'de')

          return expectSaga(hasInvalidCache)
            .provide([
              [matchers.call(rest.hasRevisionIdChanged), false],
              [matchers.call(intl.loadUserWithLocale), userInfo]
            ])
            .returns(false)
            .run()
        })

        test('should return invalid if revision has changed', () => {
          const userInfo = {
            locale: 'de',
            username: 'hans',
            businessUnitId: 'test'
          }

          cache.addLongTerm('session', 'principal', {currentBusinessUnit: {id: 'test'}, username: 'hans'})
          cache.addLongTerm('session', 'locale', 'de')

          return expectSaga(hasInvalidCache)
            .provide([
              [matchers.call(rest.hasRevisionIdChanged), true],
              [matchers.call(intl.loadUserWithLocale), userInfo]
            ])
            .returns(true)
            .run()
        })

        test('should return invalid if username has changed', () => {
          const userInfo = {
            locale: 'de',
            username: 'hans',
            businessUnitId: 'test'
          }

          cache.addLongTerm('session', 'principal', {currentBusinessUnit: {id: 'test'}, username: 'susi'})
          cache.addLongTerm('session', 'locale', 'de')

          return expectSaga(hasInvalidCache)
            .provide([
              [matchers.call(rest.hasRevisionIdChanged), false],
              [matchers.call(intl.loadUserWithLocale), userInfo]
            ])
            .returns(true)
            .run()
        })

        test('should return invalid if business unit has changed', () => {
          const userInfo = {
            locale: 'de',
            username: 'hans',
            businessUnitId: 'test'
          }

          cache.addLongTerm('session', 'principal', {currentBusinessUnit: {id: '123'}, username: 'hans'})
          cache.addLongTerm('session', 'locale', 'de')

          return expectSaga(hasInvalidCache)
            .provide([
              [matchers.call(rest.hasRevisionIdChanged), false],
              [matchers.call(intl.loadUserWithLocale), userInfo]
            ])
            .returns(true)
            .run()
        })

        test('should return invalid if locale has changed', () => {
          const userInfo = {
            locale: 'de',
            username: 'hans',
            businessUnitId: 'test'
          }

          cache.addLongTerm('session', 'principal', {currentBusinessUnit: {id: 'test'}, username: 'hans'})
          cache.addLongTerm('session', 'locale', 'en')

          return expectSaga(hasInvalidCache)
            .provide([
              [matchers.call(rest.hasRevisionIdChanged), false],
              [matchers.call(intl.loadUserWithLocale), userInfo]
            ])
            .returns(true)
            .run()
        })

        test('should return invalid if nothing is in cache yet', () => {
          const userInfo = {
            locale: 'de',
            username: 'hans',
            businessUnitId: 'test'
          }

          return expectSaga(hasInvalidCache)
            .provide([
              [matchers.call(rest.hasRevisionIdChanged), false],
              [matchers.call(intl.loadUserWithLocale), userInfo]
            ])
            .returns(true)
            .run()
        })
      })
    })
  })
})
