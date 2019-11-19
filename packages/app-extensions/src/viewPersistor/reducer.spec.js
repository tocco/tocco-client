import reducer from './reducer'
import * as actions from './actions'

const INITIAL_STATE = {
  persistedViews: {}
}

describe('app-extensions', () => {
  describe('viewPersistor', () => {
    describe('reducer', () => {
      test('should create a valid initial state', () => {
        expect(reducer(undefined, {})).to.deep.equal(INITIAL_STATE)
      })

      test('should add current view infos to store', () => {
        const info = {
          a: 1,
          b: 2
        }

        const stateAfter = reducer(INITIAL_STATE, actions.persistViewInfo('/a', 1, info))
        expect(stateAfter.persistedViews).to.have.property('/a')
        expect(stateAfter.persistedViews['/a']).to.have.property('level', 1)
        expect(stateAfter.persistedViews['/a']).to.have.deep.property('info', info)
      })

      test('should add additional current view infos', () => {
        const initialState = {
          persistedViews: {
            '/a': {
              level: 1,
              info: {
                a: '123'
              }
            }
          }
        }

        const stateAfter = reducer(initialState, actions.persistViewInfo('/a', 1, {b: '456'}))
        expect(stateAfter.persistedViews).to.have.property('/a')

        expect(stateAfter.persistedViews['/a']).to.have.deep.property('info', {a: '123', b: '456'})
      })

      test('should remove depending on level', () => {
        const initialState = {
          persistedViews: {
            a: {
              level: 1
            },
            b: {
              level: 2,
              info: {a: '123'}
            },
            c: {
              level: 3
            },
            d: {
              level: 4
            }
          }
        }

        const stateAfter = reducer(initialState, actions.clearPersistedViews(3))
        expect(stateAfter.persistedViews).to.have.property('a')
        expect(stateAfter.persistedViews).to.have.property('b')
        expect(stateAfter.persistedViews.b).to.have.deep.property('info', {a: '123'})
        expect(stateAfter.persistedViews).to.not.have.property('c')
        expect(stateAfter.persistedViews).to.not.have.property('d')
      })
    })
  })
})
