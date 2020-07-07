import fetchMock from 'fetch-mock'

import {setLocale, getUserLocale, loadTextResources} from './intl'
import cache from '../cache'

describe('tocco-util', () => {
  describe('intl', () => {
    beforeEach(() => {
      fetchMock.reset()
      fetchMock.restore()
      cache.clear()
    })

    describe('setLocale', () => {
      test('call dispatch on store', done => {
        const body = {
          test: 'test'
        }
        fetchMock.get('*', body)

        const dispatchSpy = sinon.spy()
        const store = {
          dispatch: dispatchSpy
        }
        setLocale(store, ['merge'], 'de_CH').then(() => {
          expect(dispatchSpy).to.have.calledWith(sinon.match({
            type: '@@intl/UPDATE'
          }))
          expect(fetchMock.called()).to.be.true
          done()
        })
      })
    })

    describe('getUserLocale', () => {
      test('should load user locale with fetch', async() => {
        const usernameRequestBody = {
          locale: 'de_CH'
        }
        fetchMock.get('/nice2/username', usernameRequestBody)

        const result = await getUserLocale()
        expect(result).to.eql('de_CH')
      })

      test('should read from cache after first fetch', async() => {
        const cachedLocale = 'fr'
        cache.add('user', 'locale', cachedLocale)

        const result = await getUserLocale()
        expect(result).to.eql(cachedLocale)
      })
    })

    describe('loadTextResources', () => {
      test('should fetch text resources and cache them individually', async() => {
        const mergeMessages = {
          'client.merge': 'test'
        }

        const componentsMessages = {
          'client.components': 'test2'
        }

        const actionTitles = {
          'client.actions.delete.title': 'Löschen',
          'client.actions.input-edit.title': 'Noteneingabe'
        }

        const textResourceResponse = {
          ...mergeMessages,
          ...componentsMessages,
          ...actionTitles
        }

        fetchMock.getOnce(
          '/nice2/textresource?locale=en-GB&module=(merge|components|actions.[^.]*\\.title)',
          textResourceResponse
        )

        const resources = await loadTextResources('en-GB', ['merge', 'components', 'actions.[^.]*\\.title'])

        expect(resources).to.eql(resources)
        const resources2 = await loadTextResources('en-GB', ['merge', 'components', 'actions.[^.]*\\.title'])
        expect(resources2).to.eql(resources)

        expect(cache.get('textResource', 'merge')).to.eql(mergeMessages)
        expect(cache.get('textResource', 'components')).to.eql(componentsMessages)
        expect(cache.get('textResource', 'actions.[^.]*\\.title')).to.eql(actionTitles)
      })
    })
  })
})
