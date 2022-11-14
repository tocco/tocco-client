import {generateWidgetCode} from './widgetCode'

const trim = val => val.replace(/\s/g, '')

describe('widget-code-copy', () => {
  describe('utils', () => {
    describe('widgetCode', () => {
      describe('generateWidgetCode', () => {
        test('should set correct widget-key', () => {
          const widgetConfig = {
            key: 1
          }
          const expectedWidgetCode = trim(`
            <div data-tocco-widget-key="1"></div>
          `)

          expect(trim(generateWidgetCode(widgetConfig))).to.equal(expectedWidgetCode)
        })
      })
    })
  })
})
