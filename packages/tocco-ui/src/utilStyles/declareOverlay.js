/**
 * overlay an element completely by a pseudo element to colorize it and make it inaccessible
 * @param  {color}      css color
 * @param  {integer}    opacity
 * @return {string}     declaration
 */

const declareOverlay = (backgroundColor, opacity) => {
  // inspired by https://gist.github.com/sethlopezme/d072b945969a3cc2cc11
  // adapt regex by utilizing https://regex101.com/r/nNI4US/3
  const regexHexRgbRgba = /(^#[a-fA-F0-9]{3}$)|(^#[a-fA-F0-9]{6}$)|(^rgba\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),\s*(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),\s*(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),\s*(0?\.\d|1(\.0)?)\)$)|(^rgb\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),\s*(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),\s*(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\)$)/  // eslint-disable-line
  if (!regexHexRgbRgba.test(backgroundColor)) {
    throw new Error(`Error in declareOverlay: ${backgroundColor} is an invalid color`)
  }

  if (!(typeof opacity === 'number' && opacity >= 0 && opacity <= 1)) {
    throw new Error(`Error in declareOverlay: ${opacity} is an invalid opacity`)
  }

  return `
    &:after {
      background-color: ${backgroundColor};
      border-radius: inherit;
      bottom: 0;
      content: '';
      left: 0;
      opacity: ${opacity};
      position: absolute;
      right: 0;
      top: 0;
    }
  `
}

export default declareOverlay
