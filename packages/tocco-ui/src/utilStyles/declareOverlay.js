/**
 * overlay an element completely by a pseudo element to colorize it and make it inaccessible
 * @param  {color}      css color
 * @param  {integer}    opacity
 * @return {string}     declaration
 */

const declareOverlay = (backgroundColor, opacity) => {
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
