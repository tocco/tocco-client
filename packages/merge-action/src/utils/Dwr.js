export default function sendDwrRequest(remoteService, args) {
  return new Promise((resolve) => {
    nice2.netui.dwr.RemoteService.call({
      remoteService: remoteService,
      method: 'getMergeConfig',
      args: [args],
      success: res => resolve(res)
    })
  })
}
