import * as actions from './actions'
import {setToolTip} from './reducer'

describe('tocco-util', () => {
  describe('formData', () => {
    describe('tooltips', () => {
      describe('reducer', () => {
        describe('setToolTip', () => {
          it('should add new tooltip', () => {
            const initialState = {
              tooltips: {}
            }

            const tooltip = '<h1>Tooltip</h1>'

            const newState = setToolTip(initialState, actions.setToolTip('User', 1, tooltip))

            const expectedStateAfter = {
              tooltips: {
                User: {
                  1: tooltip
                }
              }
            }

            expect(newState).to.eql(expectedStateAfter)
          })

          it('should overwrite tooltip with new value and keep the others', () => {
            const initialState = {
              tooltips: {
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
              tooltips: {
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
