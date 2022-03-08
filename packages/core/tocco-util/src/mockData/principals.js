export const setupPrincipals = fetchMock => {
  fetchMock.get(new RegExp('^.*?/nice2/rest/principals$'), {
    username: 'tocco',
    businessUnit: {
      id: 'test1',
      label: 'test1'
    },
    interfaceLanguage: 'de'
  })
}
