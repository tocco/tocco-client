export default fetchMock => {
  fetchMock.post(new RegExp('^.*?/nice2/log'), (url, opts) => {
    console.log('fetchMock: Logging to log-servlet...', opts)
    return {}
  })
}
