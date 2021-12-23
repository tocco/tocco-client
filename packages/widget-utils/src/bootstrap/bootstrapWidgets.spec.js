import {mount} from 'enzyme'
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

        wrapper = mount(<div data-tocco-widget="entity-browser" data-widget-param="test"></div>, {
          attachTo: document.body
        })
        const container = wrapper.getDOMNode()

        const backendUrl = 'http://localhost:8080'
        await bootstrapWidgets({backendUrl})

        const expectedInput = {
          backendUrl,
          toccoWidget: 'entity-browser',
          widgetParam: 'test'
        }
        expect(renderSpy).to.have.been.calledWith(
          'entity-browser',
          container,
          '',
          expectedInput,
          {},
          'http://localhost:8080/js/tocco-entity-browser/dist/'
        )
      })

      test('should apply tocco theme as input parameter', async () => {
        const renderSpy = sinon.spy()
        window.reactRegistry = {
          render: renderSpy
        }
        window[THEME_OBJ_NAME] = {fontSize: 30}

        wrapper = mount(<div data-tocco-widget="entity-browser"></div>, {attachTo: document.body})
        const container = wrapper.getDOMNode()

        const backendUrl = 'http://localhost:8080'
        await bootstrapWidgets({backendUrl})

        const expectedInput = {
          backendUrl,
          customTheme: window[THEME_OBJ_NAME],
          toccoWidget: 'entity-browser'
        }
        expect(renderSpy).to.have.been.calledWith(
          'entity-browser',
          container,
          '',
          expectedInput,
          {},
          'http://localhost:8080/js/tocco-entity-browser/dist/'
        )
      })

      test('should apply event handlers', async () => {
        const renderSpy = sinon.spy()
        window.reactRegistry = {
          render: renderSpy
        }
        window[EVENT_HANDLERS_OBJ_NAME] = {someEvent: () => {}}

        wrapper = mount(<div data-tocco-widget="entity-browser"></div>, {attachTo: document.body})
        const container = wrapper.getDOMNode()

        const backendUrl = 'http://localhost:8080'
        await bootstrapWidgets({backendUrl})

        const expectedInput = {
          backendUrl,
          toccoWidget: 'entity-browser'
        }
        expect(renderSpy).to.have.been.calledWith(
          'entity-browser',
          container,
          '',
          expectedInput,
          window[EVENT_HANDLERS_OBJ_NAME],
          'http://localhost:8080/js/tocco-entity-browser/dist/'
        )
      })

      test('should consider package name', async () => {
        const renderSpy = sinon.spy()
        window.reactRegistry = {
          render: renderSpy
        }
        window[EVENT_HANDLERS_OBJ_NAME] = {someEvent: () => {}}

        wrapper = mount(<div data-tocco-widget="passwort-change" data-tocco-package="login"></div>, {
          attachTo: document.body
        })
        const container = wrapper.getDOMNode()

        const backendUrl = 'http://localhost:8080'
        await bootstrapWidgets({backendUrl})

        const expectedInput = {
          backendUrl,
          toccoWidget: 'passwort-change',
          toccoPackage: 'login'
        }
        expect(renderSpy).to.have.been.calledWith(
          'passwort-change',
          container,
          '',
          expectedInput,
          window[EVENT_HANDLERS_OBJ_NAME],
          'http://localhost:8080/js/tocco-login/dist/'
        )
      })
    })
  })
})
