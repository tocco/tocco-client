const declareNoneWrappingText = props => {
  return `
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `
}

const declareWrappingText = props => {
  return `
    hyphens: auto;
    overflow-wrap: break-word;
    white-space: normal;
    word-wrap: break-word;
  `
}

export {
  declareNoneWrappingText,
  declareWrappingText
}
