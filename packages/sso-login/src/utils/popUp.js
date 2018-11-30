import _reduce from 'lodash/reduce'

export const getPopUpFeatures = (height = 200, width = 200) => {
  const features = {
    height,
    width,
    left: (window.screen.width / 2) - (width / 2),
    top: (window.screen.height / 2) - (height / 2),
    resizable: 1,
    scrollbars: 1,
    status: 1
  }

  return _reduce(features, (result, value, key) => [...result, `${key}=${value}`], [])
    .join(',')
}
