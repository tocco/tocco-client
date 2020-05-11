export default {
  getOptions: ({formData}) => ({
    hoursLabel: formData.intl.formatMessage({id: 'client.component.duration.hoursLabel'}),
    minutesLabel: formData.intl.formatMessage({id: 'client.component.duration.minutesLabel'})
  })
}
