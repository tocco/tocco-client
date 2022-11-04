import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {intlEnzyme} from 'tocco-test-util'
import {LoadMask} from 'tocco-ui'
import {bundle} from 'tocco-util'

import actionFactory from './actionFactory'
import DynamicAction from './components/DynamicAction'
import {fetchActionPackages} from './modules/dynamicActions/actions'

let stub

describe('app-extensions', () => {
  describe('actions', () => {
    describe('actionFactory', () => {
      beforeEach(() => {
        stub = sinon.stub(bundle, 'useBundledApp').returns(() => <div id="dynamicaction" />)
      })

      afterEach(() => {
        if (stub) {
          stub.restore()
        }
      })

      test('should render action', () => {
        const actions = {
          myaction: () => <div id="myaction" />
        }
        const ActionComp = actionFactory(actions)

        const store = createStore(() => ({
          dynamicActions: {actionPackages: []}
        }))

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={store}>
            <ActionComp appId="myaction" />
          </Provider>
        )

        expect(wrapper.find('#myaction')).to.have.length(1)
      })

      test('should render dynamic action', () => {
        const actions = {
          myaction: () => <div id="myaction" />
        }
        const ActionComp = actionFactory(actions)

        const store = createStore(() => ({
          dynamicActions: {
            actionPackages: [{actionName: 'mydynamicaction', packageName: 'package-name', appName: 'app-name'}]
          }
        }))

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={store}>
            <ActionComp appId="mydynamicaction" />
          </Provider>
        )

        const Action = wrapper.find(DynamicAction)
        expect(Action).to.have.length(1)
        expect(Action.prop('packageName')).to.eql('package-name')
        expect(Action.prop('appName')).to.eql('app-name')

        expect(wrapper.find('#dynamicaction')).to.have.length(1)
      })

      test('should render loading when action packages are not fetched yet', () => {
        const actions = {
          myaction: () => <div id="myaction" />
        }
        const ActionComp = actionFactory(actions)

        const store = createStore(() => ({
          dynamicActions: {actionPackages: undefined}
        }))

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={store}>
            <ActionComp appId="myaction" />
          </Provider>
        )

        expect(wrapper.find(LoadMask)).to.have.length(1)
        expect(wrapper.find('#myaction')).to.have.length(0)
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

        intlEnzyme.mountWithIntl(
          <Provider store={store}>
            <ActionComp appId="myaction" />
          </Provider>
        )

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

        intlEnzyme.mountWithIntl(
          <Provider store={store}>
            <ActionComp appId="myaction" />
          </Provider>
        )

        expect(store.getState().fetched).to.not.be.true
      })
    })
  })
})
