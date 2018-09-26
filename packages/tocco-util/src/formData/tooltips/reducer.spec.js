import * as actions from './actions'
import {setToolTip} from './reducer'

describe('tocco-util', () => {
  describe('formData', () => {
    describe('tooltips', () => {
      describe('reducer', () => {
        describe('setToolTip', () => {
          test('should add new tooltip', () => {
            const initialState = {data: {}}

            const tooltip = '<h1>Tooltip</h1>'

            const newState = setToolTip(initialState, actions.setToolTip('User', 1, tooltip))

            const expectedStateAfter = {
              data: {
                User: {
                  1: tooltip
                }
              }
            }

            expect(newState).to.eql(expectedStateAfter)
          })

          test('should overwrite tooltip with new value and keep the others', () => {
            const initialState = {
              data: {
                User: {
                  1: 'u1',
                  2: 'u2'
                },
                Dummy_entity: {
                  1: 'd1'
                }
              }
            }

            const tooltip = 'u2 new'

            const newState = setToolTip(initialState, actions.setToolTip('User', 2, tooltip))

            const expectedStateAfter = {
              data: {
                User: {
                  1: 'u1',
                  2: tooltip
                },
                Dummy_entity: {
                  1: 'd1'
                }
              }
            }
            expect(newState).to.eql(expectedStateAfter)
          })
        })
      })
    })
  })
})
