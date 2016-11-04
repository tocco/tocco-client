export default function sendDwrRequest(remoteService, method, args) {
  return nice2.netui.dwr.RemoteService.call({
    remoteService: remoteService,
    method: method,
    args: [args]
  })
}
