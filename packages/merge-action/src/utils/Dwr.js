export default function sendDwrRequest(remoteService, method, args) {
  return new Promise((resolve) => {
    nice2.netui.dwr.RemoteService.call({
      remoteService: remoteService,
      method: method,
      args: [args],
      success: res => resolve(res)
    })
  })
}
