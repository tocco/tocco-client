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

import IconRaw from '!raw-loader!../../tocco-ui/src/Icon/Icon'
import IconExample from '../../tocco-ui/src/Icon/example'
import IconExampleRaw from '!raw-loader!../../tocco-ui/src/Icon/example'

import PreviewRaw from '!raw-loader!../../tocco-ui/src/Preview/Preview'
import PreviewExample from '../../tocco-ui/src/Preview/example'
import PreviewExampleRaw from '!raw-loader!../../tocco-ui/src/Preview/example'

import UploadRaw from '!raw-loader!../../tocco-ui/src/Upload/Upload'
import UploadExample from '../../tocco-ui/src/Upload/example'
import UploadExampleRaw from '!raw-loader!../../tocco-ui/src/Upload/example'

import SearchBoxRaw from '!raw-loader!../../tocco-ui/src/SearchBox/SearchBox'
import SearchBoxExample from '../../tocco-ui/src/SearchBox/example'
import SearchBoxExampleRaw from '!raw-loader!../../tocco-ui/src/SearchBox/example'

import FormFieldRaw from '!raw-loader!../../tocco-ui/src/FormField/FormField'
import FormFieldExample from '../../tocco-ui/src/FormField/example'
import FormFieldExampleRaw from '!raw-loader!../../tocco-ui/src/FormField/example'

import PaginationRaw from '!raw-loader!../../tocco-ui/src/Pagination/Pagination'
import PaginationExample from '../../tocco-ui/src/Pagination/example'
import PaginationExampleRaw from '!raw-loader!../../tocco-ui/src/Pagination/example'

import LayoutBoxRaw from '!raw-loader!../../tocco-ui/src/LayoutBox/LayoutBox'
import LayoutBoxExample from '../../tocco-ui/src/LayoutBox/example'
import LayoutBoxExampleRaw from '!raw-loader!../../tocco-ui/src/LayoutBox/example'

import ErrorLoggingExample from './toccoUtilExamples/errorLogging/example'
import ErrorLoggingExampleRaw from '!raw-loader!./toccoUtilExamples/errorLogging/example'

import NotifierExample from './toccoUtilExamples/notifier/example'
import NotifierExampleRaw from '!raw-loader!./toccoUtilExamples/notifier/example'

const categories = {
  CONTENT: 'Content',
  FORMS: 'Form Controls',
  LAYOUT: 'Layout',
  UTIL: 'Tocco-Util'
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
      },
      {
        name: 'Preview',
        raw: PreviewRaw,
        example: {
          component: PreviewExample,
          raw: PreviewExampleRaw
        }
      },
      {
        name: 'Upload',
        raw: UploadRaw,
        example: {
          component: UploadExample,
          raw: UploadExampleRaw
        }
      },
      {
        name: 'Icon',
        raw: IconRaw,
        example: {
          component: IconExample,
          raw: IconExampleRaw
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
      },
      {
        name: 'FormField',
        raw: FormFieldRaw,
        example: {
          component: FormFieldExample,
          raw: FormFieldExampleRaw
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
  },
  {
    category: categories.UTIL,
    components: [
      {
        name: 'Error Logging',
        description: 'Example to log Errors in an application',
        example: {
          component: ErrorLoggingExample,
          raw: ErrorLoggingExampleRaw
        }
      },
      {
        name: 'Notifications',
        description: 'To show various notifications to the user',
        example: {
          component: NotifierExample,
          raw: NotifierExampleRaw
        }
      }
    ]
  }
]
