import {setBackendUrl, setNoMock} from './_development'

export default config => ({
  compiler_hash_type: 'chunkhash',
  compiler_devtool: false,
  globals: {
    ...config.globals,
    __BACKEND_URL__: setBackendUrl(),
    __NO_MOCK__: setNoMock() || false
  }
})
