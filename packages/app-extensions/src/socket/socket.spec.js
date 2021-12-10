import {getSocketUrl} from './socket'

describe('app-extensions', () => {
  describe('socket', () => {
    describe('getSocketUrl', () => {
      test('getSocketUrl', () => {
        global.__BACKEND_URL__ = 'https://master.tocco.ch'
        expect(getSocketUrl('my-test-socket', 'my-test-origin-id'))
          .to.be.eql('wss://master.tocco.ch/nice2/websocket/my-test-socket?X-Origin-Id=my-test-origin-id')
        global.__BACKEND_URL__ = ''
      })

      test('use location fallback for relative backend url', () => {
        expect(getSocketUrl('my-test-socket', 'my-test-origin-id'))
          .to.be.eql('ws://localhost/nice2/websocket/my-test-socket?X-Origin-Id=my-test-origin-id')
      })
    })
  })
})
