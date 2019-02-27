import {getUrl, getNoMock} from './_development'

export default config => {
  const configObject = {
    compiler_hash_type: 'chunkhash',
    compiler_devtool: false,
    globals: {
      ...config.globals,
      __BACKEND_URL__: getUrl() || JSON.stringify(''),
      __NO_MOCK__: getNoMock() || false
    }
  }
  console.log('______________________________configObject', configObject)
  return configObject
}
