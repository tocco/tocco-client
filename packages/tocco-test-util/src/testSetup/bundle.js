import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import chaiEnzyme from 'chai-enzyme'
import {configure} from 'enzyme'

// These settings have to be configured in test-bundler.js files and won't work if set in test-setup.js
export default () => {
  configure({adapter: new Adapter()})
  global.chai.use(chaiEnzyme())
}
