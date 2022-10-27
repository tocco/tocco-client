import {mount} from 'enzyme'
import fetchMock from 'fetch-mock'
import {utils} from 'tocco-util/bundle'

import bootstrapWidgets from './bootstrapWidgets'
import {BOOTSTRAP_SCRIPT_OBJ_NAME, EVENT_HANDLERS_OBJ_NAME, THEME_OBJ_NAME} from './constants'

let stub
let wrapper

describe('widget-utils', () => {
  describe('boostrap', () => {
    describe('bootstrapWidgets', () => {
      beforeEach(() => {
        stub = sinon.stub(utils, 'loadScriptAsync').returns({})
        fetchMock.restore()
        fetchMock.config.warnOnFallback = false
      })

      afterEach(() => {
        if (stub) {
          stub.restore()
        }

        if (wrapper) {
          wrapper.detach()
        }

        delete window[THEME_OBJ_NAME]
        delete window[EVENT_HANDLERS_OBJ_NAME]
        delete window[BOOTSTRAP_SCRIPT_OBJ_NAME]
        delete window.reactRegistry
      })

      const backendUrl = 'http://localhost:8080'
      const assetUrl = 'http://localhost:8080'

      test('should initialize and render widget', async () => {
        const renderSpy = sinon.spy()
        window.reactRegistry = {
          render: renderSpy
        }

        fetchMock
          .get('http://localhost:8080/nice2/rest/widget/configs/1', {
            key: '1',
            appName: 'login',
            packageName: 'login',
            locale: 'de',
            config: {
              showTitle: true,
              passwordRequest: false,
              username: 'test-username'
            }
          })
          .spy()

        wrapper = mount(<div data-tocco-widget-key="1"></div>, {
          attachTo: document.body
        })
        const container = wrapper.getDOMNode()

        await bootstrapWidgets({backendUrl, assetUrl})

        await fetchMock.flush()
        expect(fetchMock.calls().length).to.equal(1)

        const expectedInput = {
          backendUrl,
          locale: 'de',
          showTitle: true,
          passwordRequest: false,
          username: 'test-username',
          appContext: {embedType: 'widget', widgetConfigKey: '1'}
        }
        expect(renderSpy).to.have.been.calledWith(
          'login',
          container,
          '',
          expectedInput,
          {},
          'http://localhost:8080/js/tocco-login/dist/'
        )
        expect(window[BOOTSTRAP_SCRIPT_OBJ_NAME].backendUrl).to.eql(backendUrl)
        expect(window[BOOTSTRAP_SCRIPT_OBJ_NAME].assetUrl).to.eql(assetUrl)
      })

      test('should not execute when bootstrap script has run before', async () => {
        const renderSpy = sinon.spy()
        window.reactRegistry = {
          render: renderSpy
        }
        window[BOOTSTRAP_SCRIPT_OBJ_NAME] = {version: '1.0'}

        fetchMock.spy()

        wrapper = mount(<div data-tocco-widget-key="1"></div>, {
          attachTo: document.body
        })

        await bootstrapWidgets({backendUrl})

        await fetchMock.flush()
        expect(fetchMock.calls().length).to.equal(0)

        expect(renderSpy).to.not.have.been.called
      })

      test('should ignore bootstrap script when bootstrap script has been initialized', async () => {
        window[BOOTSTRAP_SCRIPT_OBJ_NAME] = {version: '1.0', backendUrl: 'foo.ch'}

        await bootstrapWidgets({backendUrl})

        expect(window[BOOTSTRAP_SCRIPT_OBJ_NAME].backendUrl).to.eql('foo.ch')
      })

      test('should initialize bootstrap script', async () => {
        wrapper = mount(<div></div>, {
          attachTo: document.body
        })

        await bootstrapWidgets({backendUrl})

        expect(window[BOOTSTRAP_SCRIPT_OBJ_NAME]).to.not.be.undefined
        expect(window[BOOTSTRAP_SCRIPT_OBJ_NAME].version).to.not.be.undefined
      })

      test('should apply tocco theme as input parameter', async () => {
        const renderSpy = sinon.spy()
        window.reactRegistry = {
          render: renderSpy
        }
        window[THEME_OBJ_NAME] = {fontSize: 30}

        fetchMock
          .get('http://localhost:8080/nice2/rest/widget/configs/1', {
            key: '1',
            appName: 'login',
            packageName: 'login',
            locale: 'de',
            config: {}
          })
          .spy()

        wrapper = mount(<div data-tocco-widget-key="1"></div>, {attachTo: document.body})
        const container = wrapper.getDOMNode()

        await bootstrapWidgets({backendUrl, assetUrl})

        await fetchMock.flush()
        expect(fetchMock.calls().length).to.equal(1)

        const expectedInput = {
          backendUrl,
          customTheme: window[THEME_OBJ_NAME],
          locale: 'de',
          appContext: {embedType: 'widget', widgetConfigKey: '1'}
        }
        expect(renderSpy).to.have.been.calledWith(
          'login',
          container,
          '',
          expectedInput,
          {},
          'http://localhost:8080/js/tocco-login/dist/'
        )
      })

      test('should apply event handlers', async () => {
        const renderSpy = sinon.spy()
        window.reactRegistry = {
          render: renderSpy
        }
        window[EVENT_HANDLERS_OBJ_NAME] = {someEvent: () => {}}

        fetchMock
          .get('http://localhost:8080/nice2/rest/widget/configs/1', {
            key: '1',
            appName: 'login',
            packageName: 'login',
            locale: 'de',
            config: {}
          })
          .spy()

        wrapper = mount(<div data-tocco-widget-key="1"></div>, {attachTo: document.body})
        const container = wrapper.getDOMNode()

        await bootstrapWidgets({backendUrl, assetUrl})

        await fetchMock.flush()
        expect(fetchMock.calls().length).to.equal(1)

        const expectedInput = {
          backendUrl,
          locale: 'de',
          appContext: {embedType: 'widget', widgetConfigKey: '1'}
        }
        expect(renderSpy).to.have.been.calledWith(
          'login',
          container,
          '',
          expectedInput,
          window[EVENT_HANDLERS_OBJ_NAME],
          'http://localhost:8080/js/tocco-login/dist/'
        )
      })

      test('should consider package name', async () => {
        const renderSpy = sinon.spy()
        window.reactRegistry = {
          render: renderSpy
        }

        fetchMock
          .get('http://localhost:8080/nice2/rest/widget/configs/1', {
            key: '1',
            appName: 'password-update',
            packageName: 'login',
            locale: 'de',
            config: {}
          })
          .spy()

        wrapper = mount(<div data-tocco-widget-key="1"></div>, {attachTo: document.body})

        await bootstrapWidgets({backendUrl, assetUrl})

        await fetchMock.flush()
        expect(fetchMock.calls().length).to.equal(1)

        expect(renderSpy).to.have.been.calledWith(
          'password-update',
          sinon.match.any,
          sinon.match.any,
          sinon.match.any,
          sinon.match.any,
          'http://localhost:8080/js/tocco-login/dist/'
        )
      })

      test('should add locale as input parameter', async () => {
        const renderSpy = sinon.spy()
        window.reactRegistry = {
          render: renderSpy
        }

        fetchMock
          .get('http://localhost:8080/nice2/rest/widget/configs/1', {
            key: '1',
            appName: 'password-update',
            packageName: 'login',
            locale: 'de',
            config: {}
          })
          .spy()

        wrapper = mount(<div data-tocco-widget-key="1"></div>, {attachTo: document.body})

        await bootstrapWidgets({backendUrl, assetUrl})

        await fetchMock.flush()
        expect(fetchMock.calls().length).to.equal(1)

        const expectedInput = {
          backendUrl,
          locale: 'de',
          appContext: {embedType: 'widget', widgetConfigKey: '1'}
        }
        expect(renderSpy).to.have.been.calledWith(
          sinon.match.any,
          sinon.match.any,
          sinon.match.any,
          expectedInput,
          sinon.match.any,
          sinon.match.any
        )
      })

      test('should handle 403 errors', async () => {
        const renderSpy = sinon.spy()
        window.reactRegistry = {
          render: renderSpy
        }

        fetchMock
          .get('http://localhost:8080/nice2/rest/widget/configs/1', {
            status: 403,
            body: {
              status: 403,
              errorCode: 'INVALID_DOMAIN',
              message: 'widget embedded on invalid domain'
            }
          })
          .spy()

        wrapper = mount(<div data-tocco-widget-key="1"></div>, {attachTo: document.body})

        await bootstrapWidgets({backendUrl, assetUrl})

        await fetchMock.flush()
        expect(fetchMock.calls().length).to.equal(2)
        expect(
          fetchMock.called(
            'begin:http://localhost:8080/nice2/log?level=error&message=widget%20embedded%20on%20invalid%20domain'
          )
        ).to.equal(true)

        expect(renderSpy).to.not.have.been.called
      })

      test('should handle 404 errors', async () => {
        const renderSpy = sinon.spy()
        window.reactRegistry = {
          render: renderSpy
        }

        fetchMock
          .get('http://localhost:8080/nice2/rest/widget/configs/1', {
            status: 404,
            body: {}
          })
          .spy()

        wrapper = mount(<div data-tocco-widget-key="1"></div>, {attachTo: document.body})

        await bootstrapWidgets({backendUrl})

        await fetchMock.flush()
        expect(fetchMock.calls().length).to.equal(2)
        expect(
          fetchMock.called(
            'begin:http://localhost:8080/nice2/log?level=error&message=Widget%20config%20%271%27%20not%20found.'
          )
        ).to.equal(true)

        expect(renderSpy).to.not.have.been.called
      })

      test('should handle network errors', async () => {
        const renderSpy = sinon.spy()
        window.reactRegistry = {
          render: renderSpy
        }

        fetchMock
          .get('http://localhost:8080/nice2/rest/widget/configs/1', {
            throws: new Error('Failed to fetch')
          })
          .spy()
        wrapper = mount(<div data-tocco-widget-key="1"></div>, {attachTo: document.body})

        await bootstrapWidgets({backendUrl})

        await fetchMock.flush()
        expect(fetchMock.calls().length).to.equal(2)
        expect(
          fetchMock.called(
            'begin:http://localhost:8080/nice2/log?level=error&message=Could%20not%20fetch%20widget%20config%20%271%27.%0AERROR%20MESSAGE:%20Failed%20to%20fetch'
          )
        ).to.equal(true)

        expect(renderSpy).to.not.have.been.called
      })

      test('should ignore remote log errors', async () => {
        const renderSpy = sinon.spy()
        window.reactRegistry = {
          render: renderSpy
        }

        fetchMock
          .get('http://localhost:8080/nice2/rest/widget/configs/1', {
            throws: new Error('Failed to fetch')
          })
          .post('begin:http://localhost:8080/nice2/log', {
            throws: new Error('Failed to fetch')
          })
          .spy()
        wrapper = mount(<div data-tocco-widget-key="1"></div>, {attachTo: document.body})

        await bootstrapWidgets({backendUrl})

        await fetchMock.flush()
        expect(fetchMock.calls().length).to.equal(2)

        expect(renderSpy).to.not.have.been.called
        // should not fail with UnhandledPromiseRejection
      })

      test('should handle errors while render app', async () => {
        const renderFailure = sinon.stub().throws()
        window.reactRegistry = {
          render: renderFailure
        }

        fetchMock
          .get('http://localhost:8080/nice2/rest/widget/configs/1', {
            key: '1',
            appName: 'login',
            packageName: 'login',
            locale: 'de',
            config: {}
          })
          .spy()
        wrapper = mount(<div data-tocco-widget-key="1"></div>, {attachTo: document.body})

        await bootstrapWidgets({backendUrl})

        await fetchMock.flush()
        expect(fetchMock.calls().length).to.equal(2)
        expect(
          fetchMock.called(
            'begin:http://localhost:8080/nice2/log?level=error&message=Could%20not%20render%20app%20%27login%27.'
          )
        ).to.equal(true)

        expect(renderFailure).to.have.been.called
        // should not fail with unhandled error
      })
    })

    describe('bootstrapWidgets', () => {
      beforeEach(() => {
        stub = sinon.stub(utils, 'loadScriptAsync').rejects()
        fetchMock.restore()
        fetchMock.config.warnOnFallback = false
      })

      afterEach(() => {
        if (stub) {
          stub.restore()
        }

        if (wrapper) {
          wrapper.detach()
        }
      })

      test('should handle errors while fetching the package', async () => {
        const renderSpy = sinon.spy()
        window.reactRegistry = {
          render: renderSpy
        }

        fetchMock
          .get('http://localhost:8080/nice2/rest/widget/configs/1', {
            key: '1',
            appName: 'login',
            packageName: 'login',
            locale: 'de',
            config: {}
          })
          .spy()
        wrapper = mount(<div data-tocco-widget-key="1"></div>, {attachTo: document.body})

        const backendUrl = 'http://localhost:8080'
        await bootstrapWidgets({backendUrl})

        await fetchMock.flush()
        expect(fetchMock.calls().length).to.equal(2)
        expect(
          fetchMock.called(
            'begin:http://localhost:8080/nice2/log?level=error&message=Could%20not%20fetch%20package%20%27tocco-login%27.'
          )
        ).to.equal(true)

        expect(renderSpy).to.not.have.been.called
        // should not fail with unhandled error
      })
    })
  })
})
