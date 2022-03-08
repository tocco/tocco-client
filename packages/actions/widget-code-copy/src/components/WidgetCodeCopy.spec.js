import React from 'react'
import {intlEnzyme} from 'tocco-test-util'

import {generateWidgetCode} from '../utils/widgetCode'
import WidgetCodeCopy from './WidgetCodeCopy'

describe('widget-code-copy', () => {
  describe('components', () => {
    describe('WidgetCodeCopy', () => {
      test('should render widget code', () => {
        const fetchWidgetConfig = sinon.spy()
        const copyWidgetCode = sinon.spy()
        const widgetConfig = {key: '1', paths: {domain: {value: 'localhost'}}}

        const expectedWidgetCode = generateWidgetCode(widgetConfig)

        const wrapper = intlEnzyme.mountWithIntl(
          <WidgetCodeCopy
            fetchWidgetConfig={fetchWidgetConfig}
            copyWidgetCode={copyWidgetCode}
            widgetConfig={widgetConfig}
          />
        )

        expect(wrapper.find('code')).to.have.length(1)
        expect(wrapper.find('code').first().text()).to.equal(expectedWidgetCode)
      })

      test('should fetch widget code ', () => {
        const fetchWidgetConfig = sinon.spy()
        const copyWidgetCode = sinon.spy()
        const widgetConfig = undefined

        const wrapper = intlEnzyme.mountWithIntl(
          <WidgetCodeCopy
            fetchWidgetConfig={fetchWidgetConfig}
            copyWidgetCode={copyWidgetCode}
            widgetConfig={widgetConfig}
          />
        )

        expect(wrapper.find('code')).to.have.length(0)
        expect(fetchWidgetConfig).to.have.been.calledOnce
      })

      test('should copy widget code', () => {
        const fetchWidgetConfig = sinon.spy()
        const copyWidgetCode = sinon.spy()
        const widgetConfig = {key: '1', paths: {domain: {value: 'localhost'}}}

        const wrapper = intlEnzyme.mountWithIntl(
          <WidgetCodeCopy
            fetchWidgetConfig={fetchWidgetConfig}
            copyWidgetCode={copyWidgetCode}
            widgetConfig={widgetConfig}
          />
        )

        expect(wrapper.find('button')).to.have.length(1)
        wrapper.find('button').first().simulate('click')
        expect(copyWidgetCode).to.have.been.calledOnce
      })
    })
  })
})
