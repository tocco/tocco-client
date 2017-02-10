import {initIntl, setLocale} from './intl'
import fetchMock from 'fetch-mock'

describe('tocco-util', () => {
  describe('intl', () => {
    beforeEach(() => {
      fetchMock.reset()
      fetchMock.restore()
    })
    describe('setLocale', () => {
      it('call dispatch on store', done => {
        const body = {
          test: 'test'
        }
        fetchMock.get('*', body)

        const dispatchSpy = sinon.spy()
        const store = {
          dispatch: dispatchSpy
        }
        setLocale(store, 'merge', 'de_CH').then(() => {
          expect(dispatchSpy).to.have.calledWith(
            {payload: {locale: 'de-CH', messages: {test: 'test'}}, type: '@@intl/UPDATE'}
          )
          expect(fetchMock.called()).to.be.true
          done()
        })
      })
    })
    describe('initIntl', () => {
      it('should fetch user infos an use locale and call dispatch on store', done => {
        const messages = {
          test: 'test'
        }

        const user = {
          locale: 'en-GB'
        }

        fetchMock.get('/nice2/username', user)
        fetchMock.get('/nice2/textresource?locale=en-GB&module=merge', messages)

        const dispatchSpy = sinon.spy()
        const store = {
          dispatch: dispatchSpy
        }
        initIntl(store, 'merge').then(() => {
          expect(dispatchSpy).to.have.calledWith(
            {payload: {locale: 'en-GB', messages: {test: 'test'}}, type: '@@intl/UPDATE'}
          )
          expect(fetchMock.called()).to.be.true
          done()
        })
      })
    })
  })
})
