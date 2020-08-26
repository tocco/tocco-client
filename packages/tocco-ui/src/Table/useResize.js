import {useState} from 'react'

export default (tableElRef, resizeCallback) => {
  const [resizingColumn, setResizingColumn] = useState(null)

  const startResize = column => () => {
    setResizingColumn(column)
    tmpColResizing = column
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const onMouseUp = () => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
    setTimeout(() => { setResizingColumn(null) }, 100)
  }

  let lastPositionX
  let tmpColResizing
  const onMouseMove = e => requestAnimationFrame(() => {
    if (lastPositionX) {
      const diff = e.clientX - lastPositionX
      const thEl = tableElRef.current.querySelector(`th[id='header-cell-${tmpColResizing.id}']`)
      const width = Math.max(50, thEl.offsetWidth + diff)
      resizeCallback(tmpColResizing.id, width)
    }

    lastPositionX = e.clientX
  })

  return {resizingColumn, startResize}
}
