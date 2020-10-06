export const setupPreferences = (fetchMock, entityStore, timeout = 2000) => {
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/client/preferences.*'),
    {
      preferences: {}
    }
  )

  fetchMock.delete(
    new RegExp('^.*?/nice2/rest/client/preferences.*'),
    200
  )

  fetchMock.patch(
    new RegExp('^.*?/nice2/rest/client/preferences.*'),
    {
      preferences: {}
    }
  )
}
