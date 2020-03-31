import {useState} from 'react'

export default (tableElRef, resizeCallback) => {
  const [resizingColumn, setResizingColumn] = useState(null)

  const startResize = column => e => {
    setResizingColumn(column)
    tmpColResizing = column
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const onMouseUp = e => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
    setTimeout(() => { setResizingColumn(null) }, 100)
  }

  let lastPositionX
  let tmpColResizing
  const onMouseMove = e => requestAnimationFrame(() => {
    if (lastPositionX) {
      const diff = lastPositionX - e.clientX
      const thEl = tableElRef.current.querySelector("th[id='" + tmpColResizing.id + "']")
      const width = Math.max(50, thEl.offsetWidth - diff) + 'px'
      resizeCallback(tmpColResizing.id, width)
    }

    lastPositionX = e.clientX
  })

  return {startResize, resizingColumn}
}
