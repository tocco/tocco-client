export const goBack = (url, amount = 1) => {
  let normalizedUrl = url.replace(/\/$/, '')

  for (let i = 0; i < amount; i++) {
    normalizedUrl = normalizedUrl.substring(0, normalizedUrl.lastIndexOf('/'))
  }

  return normalizedUrl
}
