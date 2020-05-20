export const setupSettings = fetchMock => {
  fetchMock.get(new RegExp('^.*?/nice2/rest/client/settings$'),
    {captchaKey: '6LftVOkUAAAAAJJbgY2gEKz065CRNELa0DkruMtq', runEnv: 'development'})
}
