const detectTouchDevive = () =>
  'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0

export const isTouchDevice = detectTouchDevive()
