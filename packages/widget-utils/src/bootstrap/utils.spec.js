import {EVENT_HANDLERS_OBJ_NAME, buildInputFromDom, getBackendUrl, getEventHandlers} from './utils'

describe('widget-utils', () => {
  describe('bootstrap', () => {
    describe('getBackendUrl', () => {
      test('should derive backend url from script source url', () => {
        const document = {
          currentScript: {
            getAttribute: name =>
              name === 'src' ? 'https://customer.tocco.ch/js/tocco-widget-utils/dist/bootstrap.js' : undefined
          }
        }
        expect(getBackendUrl(document)).to.eql('https://customer.tocco.ch')
      })
    })

    describe('buildInputFromDom', () => {
      test('should build input object from DOM attributes', () => {
        const container = {
          attributes: [
            {name: 'data-tocco-widget', value: 'entity-browser'},
            {name: 'data-entity-name', value: 'User'},
            {name: 'style', value: 'color: red;'},
            {name: 'data-form-base', value: 'User'},
            {name: 'data-memory-history', value: 'true'}
          ]
        }
        expect(buildInputFromDom(container)).to.eql({
          entityName: 'User',
          formBase: 'User',
          memoryHistory: true,

          // the following two aren't actually needed as input
          // but they also shouldn't do any harm either
          toccoWidget: 'entity-browser',
          style: 'color: red;'
        })
      })
    })

    describe('getEventHandlers', () => {
      test('should return empty object if global map not defined', () => {
        delete window[EVENT_HANDLERS_OBJ_NAME]
        const container = {}

        expect(getEventHandlers(container)).to.eql({})
      })

      test('should return event handlers if global map is defined (one-dimensional)', () => {
        window[EVENT_HANDLERS_OBJ_NAME] = {
          loginSuccess: () => {},
          resize: () => {}
        }
        const container = {}

        expect(getEventHandlers(container)).to.eql(window[EVENT_HANDLERS_OBJ_NAME])
      })

      test('should return event handlers for id (two-dimensional)', () => {
        window[EVENT_HANDLERS_OBJ_NAME] = {
          'my-widget-id': {
            loginSuccess: () => {},
            resize: () => {}
          }
        }
        const container = {
          getAttribute: name => {
            expect(name).to.eql('data-id')
            return 'my-widget-id'
          }
        }

        expect(getEventHandlers(container)).to.eql(window[EVENT_HANDLERS_OBJ_NAME]['my-widget-id'])
      })

      test('should return empty object if no handlers defined for widget id', () => {
        window[EVENT_HANDLERS_OBJ_NAME] = {
          'my-widget-id': {
            loginSuccess: () => {},
            resize: () => {}
          }
        }
        const container = {
          getAttribute: name => {
            expect(name).to.eql('data-id')
            return 'my-other-widget-id'
          }
        }

        expect(getEventHandlers(container)).to.eql({})
      })
    })
  })
})
