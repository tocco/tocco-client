import {EVENT_HANDLERS_OBJ_NAME, METHODS_OBJ_NAME, THEME_OBJ_NAME} from './constants'
import {attachMethods, buildInputFromDom, getBackendUrl, getEventHandlers, getTheme} from './utils'

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

    describe('getTheme', () => {
      test('should return undefined if global theme is not defined', () => {
        delete window[THEME_OBJ_NAME]

        expect(getTheme()).to.be.undefined
      })

      test('should return undefined if global theme is not an object', () => {
        window[THEME_OBJ_NAME] = 'abc'

        expect(getTheme()).to.be.undefined
      })

      test('should return theme object', () => {
        window[THEME_OBJ_NAME] = {fontSize: 30}

        expect(getTheme()).to.eql(window[THEME_OBJ_NAME])
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

    describe('attachMethods', () => {
      beforeEach(() => {
        delete window[METHODS_OBJ_NAME]
      })

      test('should create obj on window', () => {
        const container = {
          getAttribute: () => 'test'
        }
        const methods = {setLocale: () => {}}

        const expectedMethodsObj = {
          test: methods
        }

        attachMethods(container, methods)

        expect(window[METHODS_OBJ_NAME]).to.deep.equal(expectedMethodsObj)
      })

      test('should attach methods to obj', () => {
        const container = {
          getAttribute: () => 'test'
        }
        const methods = {setLocale: () => {}}

        window[METHODS_OBJ_NAME] = {
          foo: 'something'
        }

        const expectedMethodsObj = {
          foo: 'something',
          test: methods
        }

        attachMethods(container, methods)

        expect(window[METHODS_OBJ_NAME]).to.deep.equal(expectedMethodsObj)
      })

      test('should ignore widgets w/o id', () => {
        const container = {
          getAttribute: () => undefined
        }
        const methods = {setLocale: () => {}}

        window[METHODS_OBJ_NAME] = {
          foo: 'something'
        }

        const expectedMethodsObj = {
          foo: 'something'
        }

        attachMethods(container, methods)

        expect(window[METHODS_OBJ_NAME]).to.deep.equal(expectedMethodsObj)
      })
    })
  })
})
