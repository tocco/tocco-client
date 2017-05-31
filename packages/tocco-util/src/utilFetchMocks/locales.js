export default fetchMock => {
  fetchMock.get(new RegExp('^.*?/nice2/rest/locales/best\\?for=.*'), {best: 'de-CH', forLocale: 'de-CH'})
}
