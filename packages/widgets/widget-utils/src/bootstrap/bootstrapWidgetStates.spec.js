import bootstrapWidgetStates, {setGlobalStyles, setWidgetStateStyles} from './bootstrapWidgetStates'

describe('widget-utils', () => {
  describe('boostrap', () => {
    describe('bootstrapWidgetStates', () => {
      const backendUrl = 'http://localhost:8080'
      const widgetKey = '23'
      const params = {backendUrl}

      afterEach(() => {
        document.getElementsByTagName('html')[0].innerHTML = ''
      })

      describe('bootstrapWidgetStates', () => {
        test('should set global initial styles for widget states', () => {
          bootstrapWidgetStates(params)

          expect(document.head.innerHTML).to.eql(
            '<style id="tocco-initial-widget-state-styles">[data-tocco-widget-states] {display: none;}</style>'
          )
        })
      })

      describe('setWidgetStateStyles', () => {
        test('should set widget state styles for multiple states', () => {
          const widgetStates = ['list', 'advanced-search']

          setWidgetStateStyles(backendUrl, widgetKey, widgetStates)

          // eslint-disable-next-line max-len
          const expectedStyles = `<style id="tocco-widget-state-styles-23">[data-tocco-widget-ref="23"][data-tocco-widget-states~="list"],
[data-tocco-widget-ref="23"][data-tocco-widget-states~="advanced-search"] {
  display: inherit;
}</style>`
          expect(document.head.innerHTML).to.eql(expectedStyles)
        })

        test('should set widget state styles for single state', () => {
          const widgetStates = ['list']

          setWidgetStateStyles(backendUrl, widgetKey, widgetStates)

          // eslint-disable-next-line max-len
          const expectedStyles = `<style id="tocco-widget-state-styles-23">[data-tocco-widget-ref="23"][data-tocco-widget-states~="list"] {
  display: inherit;
}</style>`
          expect(document.head.innerHTML).to.eql(expectedStyles)
        })

        test('should overwrite existing widget state style', () => {
          const widgetStates = ['list']
          const initialStyle = 'body {color: red}'
          setGlobalStyles(backendUrl, `tocco-widget-state-styles-${widgetKey}`, initialStyle)
          expect(document.head.innerHTML).to.eql(`<style id="tocco-widget-state-styles-23">${initialStyle}</style>`)

          setWidgetStateStyles(backendUrl, widgetKey, widgetStates)

          // eslint-disable-next-line max-len
          const expectedStyles = `<style id="tocco-widget-state-styles-23">[data-tocco-widget-ref="23"][data-tocco-widget-states~="list"] {
  display: inherit;
}</style>`
          expect(document.head.innerHTML).to.eql(expectedStyles)
        })

        test('should keep existing widget state style from other widgets', () => {
          const widgetStates = ['list']
          const initialStyle = 'body {color: red}'
          setGlobalStyles(backendUrl, `tocco-widget-state-styles-44`, initialStyle)
          expect(document.head.innerHTML).to.eql(`<style id="tocco-widget-state-styles-44">${initialStyle}</style>`)

          setWidgetStateStyles(backendUrl, widgetKey, widgetStates)

          // eslint-disable-next-line max-len
          const expectedStyles = `<style id="tocco-widget-state-styles-44">${initialStyle}</style><style id="tocco-widget-state-styles-23">[data-tocco-widget-ref="23"][data-tocco-widget-states~="list"] {
  display: inherit;
}</style>`
          expect(document.head.innerHTML).to.eql(expectedStyles)
        })

        test('should initial widget state style', () => {
          const widgetStates = ['list']
          bootstrapWidgetStates(params)

          setWidgetStateStyles(backendUrl, widgetKey, widgetStates)

          // eslint-disable-next-line max-len
          const expectedStyles = `<style id="tocco-initial-widget-state-styles">[data-tocco-widget-states] {display: none;}</style><style id="tocco-widget-state-styles-23">[data-tocco-widget-ref="23"][data-tocco-widget-states~="list"] {
  display: inherit;
}</style>`
          expect(document.head.innerHTML).to.eql(expectedStyles)
        })
      })
    })
  })
})
