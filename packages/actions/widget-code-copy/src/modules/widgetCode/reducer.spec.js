import * as actions from './actions'
import reducer from './index'

const EXPECTED_INITIAL_STATE = {
  widgetConfig: undefined
}

describe('widget-code-copy', () => {
  describe('modules', () => {
    describe('widgetCode', () => {
      describe('reducer', () => {
        test('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
        })

        test('should handle SET_WIDGET_CONFIG', () => {
          const widgetConfig = {
            key: '1',
            paths: {domain: {value: 'abc.ch'}}
          }

          const stateBefore = {
            widgetConfig: undefined
          }

          const expectedState = {
            widgetConfig
          }

          expect(reducer(stateBefore, actions.setWidgetConfig(widgetConfig))).to.deep.equal(expectedState)
        })
      })
    })
  })
})
