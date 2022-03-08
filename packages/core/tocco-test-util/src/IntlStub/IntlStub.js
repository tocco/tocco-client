export default {
  formatMessage: messageDescriptor => messageDescriptor.id,
  formatHTMLMessage: messageDescriptor => messageDescriptor.id,
  formatDate: value => value,
  formatTime: value => value,
  formatRelative: value => value,
  formatNumber: value => value,
  formatPlural: value => value,
  now: () => null
}
