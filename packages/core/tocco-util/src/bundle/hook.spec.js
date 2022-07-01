/* eslint-disable react/prop-types */
import {mount} from 'enzyme'
import {act} from 'react-dom/test-utils'

import ErrorComponent from './ErrorComponent'
import {useBundledApp} from './hook'
import utils from './utils'

let stub

const config = {packageName: 'package', appName: 'app'}
const TestApp = () => <div id="app" />
const bundle = {app: {App: TestApp, setWebpacksPublicPath: sinon.spy()}}
const bundleName = `tocco-${config.appName}`

const waitForAsyncUseEffect = async wrapper => {
  // wait for useEffect to be finished
  await act(async () => {
    await Promise.resolve(wrapper)
    wrapper.update()
  })
}

describe('tocco-util', () => {
  describe('bundle', () => {
    describe('hook', () => {
      describe('useBundledApp', () => {
        afterEach(() => {
          if (stub) {
            stub.restore()
          }

          delete window[bundleName]
        })

        test('should use bundle on window', async () => {
          window[bundleName] = bundle

          const TestComponent = () => {
            const App = useBundledApp(config)
            return App ? <App /> : <div id="loading" />
          }

          const wrapper = mount(<TestComponent />)

          await waitForAsyncUseEffect(wrapper)

          expect(wrapper.find('#app')).to.have.length(1)
        })

        test('should load bundle if not yet on window', async () => {
          stub = sinon.stub(utils, 'loadBundle').returns(bundle)

          const TestComponent = () => {
            const App = useBundledApp(config)
            return App ? <App /> : <div id="loading" />
          }

          const wrapper = mount(<TestComponent />)

          await waitForAsyncUseEffect(wrapper)

          expect(wrapper.find('#app')).to.have.length(1)
          expect(stub).has.been.calledWith(config.packageName, config.appName)
        })

        test('should return null if bundle is not loaded yet', async () => {
          const TestComponent = () => {
            const App = useBundledApp(config)
            return App === null ? <div id="loading" /> : <div id="failed" />
          }

          const wrapper = mount(<TestComponent />)

          await waitForAsyncUseEffect(wrapper)

          expect(wrapper.find('#loading')).to.have.length(1)
        })

        test('should return error component if bundle could not beend fetched', async () => {
          stub = sinon.stub(utils, 'loadBundle').throwsException()

          const TestComponent = () => {
            const App = useBundledApp(config)
            return App ? <App /> : <div id="loading" />
          }

          const wrapper = mount(<TestComponent />)

          await waitForAsyncUseEffect(wrapper)

          expect(wrapper.find(ErrorComponent)).to.have.length(1)
        })
      })
    })
  })
})
