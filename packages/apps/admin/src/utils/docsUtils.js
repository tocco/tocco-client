export const getDocsUrl = niceVersion => {
  const subdomain = niceVersion
    .split('.')
    // always use two digits (01 vs 1) except for the first number
    .map((d, index) => (index === 0 ? d : d.padStart(2, '0')))
    .join('')
  return `https://${subdomain}.docs.tocco.ch/`
}
