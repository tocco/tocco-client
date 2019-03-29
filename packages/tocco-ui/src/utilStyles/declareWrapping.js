export const declareNoneWrappingText = () => `
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const declareWrappingText = () => `
  hyphens: auto;
  overflow-wrap: break-word;
  white-space: normal;
  word-wrap: break-word;
`
