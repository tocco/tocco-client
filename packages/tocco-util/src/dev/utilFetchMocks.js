export default function utilFetchMocks(fetchMock) {
  fetchMock.get(new RegExp('^.*?/nice2/username$'), {success: true, username: 'dummy', locale: 'de_CH'})
  fetchMock.post(new RegExp('^.*?/nice2/session$'), {success: false})
  fetchMock.get(new RegExp('^.*?/nice2/textresource'), {'dummy': 'Dummy'})
}
