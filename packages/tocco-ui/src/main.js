import Button from './Button'
import LoadMask from './LoadMask'
import Table from './Table'
import Pagination from './Pagination'
import SearchBox from './SearchBox'
import FormattedValue from './FormattedValue'
import EditableValue from './EditableValue'
import LayoutBox from './LayoutBox'

const exports = {
  Button,
  LoadMask,
  Table,
  Pagination,
  SearchBox,
  FormattedValue,
  EditableValue,
  LayoutBox
}

if (__DEV__) {
  require('tocco-theme/src/ToccoTheme/theme.scss')
}

module.exports = exports
//
// let render = () => {
//   const mountElement = document.getElementById('root')
//
//   ReactDOM.render(<ToccoLogo></ToccoLogo>, mountElement)
// }
//
// render()
