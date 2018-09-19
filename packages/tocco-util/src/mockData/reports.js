export const setupReports = (fetchMock, entityStore, timeout = 2000) => {
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/reports/.*/settings*?'),
    require('./data/report_settings.json')
  )
}
