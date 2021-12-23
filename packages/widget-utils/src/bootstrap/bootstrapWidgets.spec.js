import {mount} from 'enzyme'
import fetchMock from 'fetch-mock'
import React from 'react'

import bootstrapWidgets from './bootstrapWidgets'
import {EVENT_HANDLERS_OBJ_NAME, THEME_OBJ_NAME} from './constants'
import * as utils from './utils'

let stub
let wrapper

describe('widget-utils', () => {
  describe('boostrap', () => {
    describe('bootstrapWidgets', () => {
      beforeEach(() => {
        stub = sinon.stub(utils, 'loadScriptAsync').returns({})
        fetchMock.restore()
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
      })

      test('should initialize and render widget', async () => {
        const renderSpy = sinon.spy()
        window.reactRegistry = {
          render: renderSpy
        }

        fetchMock.get('http://localhost:8080/nice2/rest/widget/configs/1', {
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

        wrapper = mount(<div data-tocco-widget-key="1"></div>, {
          attachTo: document.body
        })
        const container = wrapper.getDOMNode()

        const backendUrl = 'http://localhost:8080'
        await bootstrapWidgets({backendUrl})

        const expectedInput = {
          backendUrl,
          locale: 'de',
          showTitle: true,
          passwordRequest: false,
          username: 'test-username'
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

      test('should apply tocco theme as input parameter', async () => {
        const renderSpy = sinon.spy()
        window.reactRegistry = {
          render: renderSpy
        }
        window[THEME_OBJ_NAME] = {fontSize: 30}

        fetchMock.get('http://localhost:8080/nice2/rest/widget/configs/1', {
          key: '1',
          appName: 'login',
          packageName: 'login',
          locale: 'de',
          config: {}
        })

        wrapper = mount(<div data-tocco-widget-key="1"></div>, {attachTo: document.body})
        const container = wrapper.getDOMNode()

        const backendUrl = 'http://localhost:8080'
        await bootstrapWidgets({backendUrl})

        const expectedInput = {
          backendUrl,
          customTheme: window[THEME_OBJ_NAME],
          locale: 'de',
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

        fetchMock.get('http://localhost:8080/nice2/rest/widget/configs/1', {
          key: '1',
          appName: 'login',
          packageName: 'login',
          locale: 'de',
          config: {}
        })

        wrapper = mount(<div data-tocco-widget-key="1"></div>, {attachTo: document.body})
        const container = wrapper.getDOMNode()

        const backendUrl = 'http://localhost:8080'
        await bootstrapWidgets({backendUrl})

        const expectedInput = {
          backendUrl,
          locale: 'de',
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

        fetchMock.get('http://localhost:8080/nice2/rest/widget/configs/1', {
          key: '1',
          appName: 'password-update',
          packageName: 'login',
          locale: 'de',
          config: {}
        })

        wrapper = mount(<div data-tocco-widget-key="1"></div>, {attachTo: document.body})
        const container = wrapper.getDOMNode()

        const backendUrl = 'http://localhost:8080'
        await bootstrapWidgets({backendUrl})

        const expectedInput = {
          backendUrl,
          locale: 'de',
        }
        expect(renderSpy).to.have.been.calledWith(
          'password-update',
          container,
          '',
          expectedInput,
          {},
          'http://localhost:8080/js/tocco-login/dist/'
        )
      })

      test('should add locale as input parameter', async () => {
        const renderSpy = sinon.spy()
        window.reactRegistry = {
          render: renderSpy
        }

        fetchMock.get('http://localhost:8080/nice2/rest/widget/configs/1', {
          key: '1',
          appName: 'password-update',
          packageName: 'login',
          locale: 'de',
          config: {}
        })

        wrapper = mount(<div data-tocco-widget-key="1"></div>, {attachTo: document.body})
        const container = wrapper.getDOMNode()

        const backendUrl = 'http://localhost:8080'
        await bootstrapWidgets({backendUrl})

        const expectedInput = {
          backendUrl,
          locale: 'de'
        }
        expect(renderSpy).to.have.been.calledWith(
          'password-update',
          container,
          '',
          expectedInput,
          {},
          'http://localhost:8080/js/tocco-login/dist/'
        )
      })

      test('should handle 400 errors', async () => {
        const renderSpy = sinon.spy()
        window.reactRegistry = {
          render: renderSpy
        }

        fetchMock.get('http://localhost:8080/nice2/rest/widget/configs/1', {
          status: 400,
          body: {
            status: 400,
            errorCode: 'INVALID_DOMAIN',
            message: 'widget embedded on invalid domain'
          }
        })

        wrapper = mount(<div data-tocco-widget-key="1"></div>, {attachTo: document.body})

        const backendUrl = 'http://localhost:8080'
        await bootstrapWidgets({backendUrl})

        expect(renderSpy).to.not.have.been.called
      })

      test('should handle 404 errors', async () => {
        const renderSpy = sinon.spy()
        window.reactRegistry = {
          render: renderSpy
        }

        fetchMock.get('http://localhost:8080/nice2/rest/widget/configs/1', {
          status: 404,
          body: {}
        })

        wrapper = mount(<div data-tocco-widget-key="1"></div>, {attachTo: document.body})

        const backendUrl = 'http://localhost:8080'
        await bootstrapWidgets({backendUrl})

        expect(renderSpy).to.not.have.been.called
      })

      test('should handle network errors', async () => {
        const renderSpy = sinon.spy()
        window.reactRegistry = {
          render: renderSpy
        }

        fetchMock.get('http://localhost:8080/nice2/rest/widget/configs/1', {
          throws: new Error('Failed to fetch')
        })

        wrapper = mount(<div data-tocco-widget-key="1"></div>, {attachTo: document.body})

        const backendUrl = 'http://localhost:8080'
        await bootstrapWidgets({backendUrl})

        expect(renderSpy).to.not.have.been.called
      })
    })
  })
})
