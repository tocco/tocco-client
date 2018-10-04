export function downloadUrl(url, fileName) {
  const a = document.createElement('a')
  a.href = url
  a.download = fileName || url.split('/').pop()
  a.target = '_blank'
  document.body.appendChild(a)
  a.click()
  if (window.URL.revokeObjectURL) { window.URL.revokeObjectURL(url) }
  a.remove()
}
