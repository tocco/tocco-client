import {screen} from '@testing-library/react'
import {createStore} from 'redux'
import {testingLibrary} from 'tocco-test-util'
import {bundle} from 'tocco-util'

import actionFactory from './actionFactory'
import {fetchActionPackages} from './modules/dynamicActions/actions'

let stub

const packageName = 'package-name'
const appName = 'app-name'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('actionFactory', () => {
      beforeEach(() => {
        stub = sinon.stub(bundle, 'useBundledApp')

        stub.withArgs({packageName, appName}).returns(() => (
          <div data-testid="dynamicaction">
            <span>{packageName}</span>
            <span>{appName}</span>
          </div>
        ))
      })

      afterEach(() => {
        if (stub) {
          stub.restore()
        }
      })

      test('should render action', () => {
        const actions = {
          myaction: () => <div data-testid="myaction" />
        }
        const ActionComp = actionFactory(actions)

        const store = createStore(() => ({
          dynamicActions: {actionPackages: []}
        }))

        testingLibrary.renderWithStore(<ActionComp appId="myaction" />, {store})

        expect(screen.getByTestId('myaction')).to.exist
      })

      test('should render dynamic action', () => {
        const actions = {
          myaction: () => <div data-testid="myaction" />
        }
        const ActionComp = actionFactory(actions)

        const store = createStore(() => ({
          dynamicActions: {
            actionPackages: [{actionName: 'mydynamicaction', packageName, appName}]
          }
        }))

        testingLibrary.renderWithStore(<ActionComp appId="mydynamicaction" />, {store})

        expect(screen.getByTestId('dynamicaction')).to.exist
        expect(screen.getByText('package-name')).to.exist
        expect(screen.getByText('app-name')).to.exist
      })

      test('should render loading when action packages are not fetched yet', () => {
        const actions = {
          myaction: () => <div id="myaction" />
        }
        const ActionComp = actionFactory(actions)

        const store = createStore(() => ({
          dynamicActions: {actionPackages: undefined}
        }))

        testingLibrary.renderWithStore(<ActionComp appId="myaction" />, {store})

        expect(screen.queryByTestId('myaction')).to.not.exist
      })

      test('should fetch action packages on mount', () => {
        const actions = {
          myaction: () => <div id="myaction" />
        }
        const ActionComp = actionFactory(actions)

        const store = createStore((state, action) => {
          if (action.type === fetchActionPackages().type) {
            return {...state, fetched: true}
          }

          return {
            dynamicActions: {actionPackages: undefined}
          }
        })

        testingLibrary.renderWithStore(<ActionComp appId="myaction" />, {store})

        expect(store.getState().fetched).to.be.true
      })

      test('should not re-fetch action packages on mount when packages are loaded already', () => {
        const actions = {
          myaction: () => <div id="myaction" />
        }
        const ActionComp = actionFactory(actions)

        const store = createStore((state, action) => {
          if (action.type === fetchActionPackages().type) {
            return {...state, fetched: true}
          }

          return {
            dynamicActions: {actionPackages: []}
          }
        })

        testingLibrary.renderWithStore(<ActionComp appId="myaction" />, {store})

        expect(store.getState().fetched).to.not.be.true
      })
    })
  })
})
