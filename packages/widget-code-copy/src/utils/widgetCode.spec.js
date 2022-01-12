import {generateWidgetCode} from './widgetCode'

const trim = val => val.replace(/\s/g, '')

describe('widget-code-copy', () => {
  describe('utils', () => {
    describe('widgetCode', () => {
      describe('generateWidgetCode', () => {
        test('should consider localhost', () => {
          const widgetConfig = {
            key: 1,
            paths: {domain: {value: 'localhost'}}
          }
          const expectedWidgetCode = trim(`
            <div data-tocco-widget-key="1"></div>
            <script src="http://localhost:8080/js/tocco-widget-utils/dist/bootstrap.js" />
          `)

          expect(trim(generateWidgetCode(widgetConfig))).to.equal(expectedWidgetCode)
        })

        test('should consider tocco domains', () => {
          const widgetConfig = {
            key: 1,
            paths: {domain: {value: 'abc.tocco.ch'}}
          }
          const expectedWidgetCode = trim(`
            <div data-tocco-widget-key="1"></div>
            <script src="https://abc.tocco.ch/js/tocco-widget-utils/dist/bootstrap.js" />
          `)

          expect(trim(generateWidgetCode(widgetConfig))).to.equal(expectedWidgetCode)
        })

        test('should add tocco subdomain for foreign domains', () => {
          const widgetConfig = {
            key: 1,
            paths: {domain: {value: 'abc.ch'}}
          }
          const expectedWidgetCode = trim(`
            <div data-tocco-widget-key="1"></div>
            <script src="https://tocco.abc.ch/js/tocco-widget-utils/dist/bootstrap.js" />
          `)

          expect(trim(generateWidgetCode(widgetConfig))).to.equal(expectedWidgetCode)
        })
      })
    })
  })
})
