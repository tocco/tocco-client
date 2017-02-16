import FormattedValueRaw from '!raw-loader!../../tocco-ui/src/FormattedValue/FormattedValue'
import FormattedValueExample from '../../tocco-ui/src/FormattedValue/example'
import FormattedValueExampleRaw from '!raw-loader!../../tocco-ui/src/FormattedValue/example'

import EditableValueRaw from '!raw-loader!../../tocco-ui/src/EditableValue/EditableValue'
import EditableValueExample from '../../tocco-ui/src/EditableValue/example'
import EditableValueExampleRaw from '!raw-loader!../../tocco-ui/src/EditableValue/example'

import TableRaw from '!raw-loader!../../tocco-ui/src/Table/Table'
import TableExample from '../../tocco-ui/src/Table/example'
import TableExampleRaw from '!raw-loader!../../tocco-ui/src/Table/example'

import LoadMaskRaw from '!raw-loader!../../tocco-ui/src/LoadMask/LoadMask'
import LoadMaskExample from '../../tocco-ui/src/LoadMask/example'
import LoadMaskExampleRaw from '!raw-loader!../../tocco-ui/src/LoadMask/example'

import ButtonRaw from '!raw-loader!../../tocco-ui/src/Button/Button'
import ButtonExample from '../../tocco-ui/src/Button/example'
import ButtonExampleRaw from '!raw-loader!../../tocco-ui/src/Button/example'

import SearchBoxRaw from '!raw-loader!../../tocco-ui/src/SearchBox/SearchBox'
import SearchBoxExample from '../../tocco-ui/src/SearchBox/example'
import SearchBoxExampleRaw from '!raw-loader!../../tocco-ui/src/SearchBox/example'

import PaginationRaw from '!raw-loader!../../tocco-ui/src/Pagination/Pagination'
import PaginationExample from '../../tocco-ui/src/Pagination/example'
import PaginationExampleRaw from '!raw-loader!../../tocco-ui/src/Pagination/example'

import LayoutBoxRaw from '!raw-loader!../../tocco-ui/src/LayoutBox/LayoutBox'
import LayoutBoxExample from '../../tocco-ui/src/LayoutBox/example'
import LayoutBoxExampleRaw from '!raw-loader!../../tocco-ui/src/LayoutBox/example'

const categories = {
  CONTENT: 'Content',
  FORMS: 'Form Controls',
  LAYOUT: 'Layout'
}

export default [
  {
    category: categories.CONTENT,
    components: [
      {
        name: 'FormattedValue',
        raw: FormattedValueRaw,
        example: {
          component: FormattedValueExample,
          raw: FormattedValueExampleRaw
        }
      },
      {
        name: 'EditableValue',
        raw: EditableValueRaw,
        example: {
          component: EditableValueExample,
          raw: EditableValueExampleRaw
        }
      },
      {
        name: 'Table',
        raw: TableRaw,
        example: {
          component: TableExample,
          raw: TableExampleRaw
        }
      },
      {
        name: 'Pagination',
        raw: PaginationRaw,
        example: {
          component: PaginationExample,
          raw: PaginationExampleRaw
        }
      },
      {
        name: 'LoadMask',
        raw: LoadMaskRaw,
        example: {
          component: LoadMaskExample,
          raw: LoadMaskExampleRaw
        }
      }]
  },
  {
    category: categories.FORMS,
    components: [
      {
        name: 'Button',
        raw: ButtonRaw,
        example: {
          component: ButtonExample,
          raw: ButtonExampleRaw
        }
      },
      {
        name: 'SearchBox',
        raw: SearchBoxRaw,
        example: {
          component: SearchBoxExample,
          raw: SearchBoxExampleRaw
        }
      }]
  },
  {
    category: categories.LAYOUT,
    components: [
      {
        name: 'Box Layouts',
        raw: LayoutBoxRaw,
        example: {
          component: LayoutBoxExample,
          raw: LayoutBoxExampleRaw
        }
      }
    ]
  }
]
