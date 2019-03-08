import {getUrl, getNoMock} from './_development'

export default config => ({
  compiler_hash_type: 'chunkhash',
  compiler_devtool: false,
  globals: {
    ...config.globals,
    __BACKEND_URL__: getUrl() || JSON.stringify(''),
    __NO_MOCK__: getNoMock() || false
  }
})
