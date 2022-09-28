import {screen, fireEvent} from '@testing-library/react'
import {testingLibrary} from 'tocco-test-util'

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

        testingLibrary.renderWithIntl(
          <WidgetCodeCopy
            fetchWidgetConfig={fetchWidgetConfig}
            copyWidgetCode={copyWidgetCode}
            widgetConfig={widgetConfig}
          />
        )

        const codeElement = screen.getByText(
          content => content.replaceAll(/\s/g, '') === expectedWidgetCode.replaceAll(/\s/g, '')
        )
        expect(codeElement).to.exist
      })

      test('should fetch widget code ', () => {
        const fetchWidgetConfig = sinon.spy()
        const copyWidgetCode = sinon.spy()
        const widgetConfig = undefined

        testingLibrary.renderWithIntl(
          <WidgetCodeCopy
            fetchWidgetConfig={fetchWidgetConfig}
            copyWidgetCode={copyWidgetCode}
            widgetConfig={widgetConfig}
          />
        )

        expect(screen.queryAllByRole('button')).to.have.length(0)
        expect(fetchWidgetConfig).to.have.been.calledOnce
      })

      test('should copy widget code', () => {
        const fetchWidgetConfig = sinon.spy()
        const copyWidgetCode = sinon.spy()
        const widgetConfig = {key: '1', paths: {domain: {value: 'localhost'}}}

        testingLibrary.renderWithIntl(
          <WidgetCodeCopy
            fetchWidgetConfig={fetchWidgetConfig}
            copyWidgetCode={copyWidgetCode}
            widgetConfig={widgetConfig}
          />
        )

        expect(screen.getByRole('button')).to.exist
        fireEvent.click(screen.getByRole('button'))
        expect(copyWidgetCode).to.have.been.calledOnce
      })
    })
  })
})
