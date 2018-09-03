/* eslint-disable monorepo/no-relative-import,import/order */
import ButtonRaw from '!raw-loader!../../tocco-ui/src/Button/Button'
import ButtonExample from '../../tocco-ui/src/Button/example'
import ButtonExampleRaw from '!raw-loader!../../tocco-ui/src/Button/example'

import ButtonGroupRaw from '!raw-loader!../../tocco-ui/src/ButtonGroup/ButtonGroup'
import ButtonGroupExample from '../../tocco-ui/src/ButtonGroup/example'
import ButtonGroupExampleRaw from '!raw-loader!../../tocco-ui/src/ButtonGroup/example'

import ButtonLinkRaw from '!raw-loader!../../tocco-ui/src/ButtonLink/ButtonLink'
import ButtonLinkExample from '../../tocco-ui/src/ButtonLink/example'
import ButtonLinkExampleRaw from '!raw-loader!../../tocco-ui/src/ButtonLink/example'

import EditableValueRaw from '!raw-loader!../../tocco-ui/src/EditableValue/EditableValue'
import EditableValueExample from '../../tocco-ui/src/EditableValue/example'
import EditableValueExampleRaw from '!raw-loader!../../tocco-ui/src/EditableValue/example'

import ErrorLoggingExample from './toccoUtilExamples/errorLogging/example'
import ErrorLoggingExampleRaw from '!raw-loader!./toccoUtilExamples/errorLogging/example'

import FormattedValueRaw from '!raw-loader!../../tocco-ui/src/FormattedValue/FormattedValue'
import FormattedValueExample from '../../tocco-ui/src/FormattedValue/example'
import FormattedValueExampleRaw from '!raw-loader!../../tocco-ui/src/FormattedValue/example'

import FormFieldRaw from '!raw-loader!../../tocco-ui/src/FormField/FormField'
import FormFieldExample from '../../tocco-ui/src/FormField/example'
import FormFieldExampleRaw from '!raw-loader!../../tocco-ui/src/FormField/example'

import IconRaw from '!raw-loader!../../tocco-ui/src/Icon/Icon'
import IconExample from '../../tocco-ui/src/Icon/example'
import IconExampleRaw from '!raw-loader!../../tocco-ui/src/Icon/example'

import IconToccoRaw from '!raw-loader!../../tocco-ui/src/IconTocco/IconTocco'
import IconToccoExample from '../../tocco-ui/src/IconTocco/example'
import IconToccoExampleRaw from '!raw-loader!../../tocco-ui/src/IconTocco/example'

import LayoutBoxRaw from '!raw-loader!../../tocco-ui/src/LayoutBox/LayoutBox'
import LayoutBoxExample from '../../tocco-ui/src/LayoutBox/example'
import LayoutBoxExampleRaw from '!raw-loader!../../tocco-ui/src/LayoutBox/example'

import LinkRaw from '!raw-loader!../../tocco-ui/src/Link/Link'
import LinkExample from '../../tocco-ui/src/Link/example'
import LinkExampleRaw from '!raw-loader!../../tocco-ui/src/Link/example'

import LoadMaskRaw from '!raw-loader!../../tocco-ui/src/LoadMask/LoadMask'
import LoadMaskExample from '../../tocco-ui/src/LoadMask/example'
import LoadMaskExampleRaw from '!raw-loader!../../tocco-ui/src/LoadMask/example'

import MenuRaw from '!raw-loader!../../tocco-ui/src/Menu/Menu'
import MenuExample from '../../tocco-ui/src/Menu/example'
import MenuExampleRaw from '!raw-loader!../../tocco-ui/src/Menu/example'

import NotifierExample from './toccoUtilExamples/notifier/example'
import NotifierExampleRaw from '!raw-loader!./toccoUtilExamples/notifier/example'

import PaginationRaw from '!raw-loader!../../tocco-ui/src/Pagination/Pagination'
import PaginationExample from '../../tocco-ui/src/Pagination/example'
import PaginationExampleRaw from '!raw-loader!../../tocco-ui/src/Pagination/example'

import PanelRaw from '!raw-loader!../../tocco-ui/src/Panel/Panel'
import PanelExample from '../../tocco-ui/src/Panel/example'
import PanelExampleRaw from '!raw-loader!../../tocco-ui/src/Panel/example'

import PreviewRaw from '!raw-loader!../../tocco-ui/src/Preview/Preview'
import PreviewExample from '../../tocco-ui/src/Preview/example'
import PreviewExampleRaw from '!raw-loader!../../tocco-ui/src/Preview/example'

import SearchBoxRaw from '!raw-loader!../../tocco-ui/src/SearchBox/SearchBox'
import SearchBoxExample from '../../tocco-ui/src/SearchBox/example'
import SearchBoxExampleRaw from '!raw-loader!../../tocco-ui/src/SearchBox/example'

import SignalBoxRaw from '!raw-loader!../../tocco-ui/src/SignalBox/SignalBox'
import SignalBoxExample from '../../tocco-ui/src/SignalBox/example'
import SignalBoxExampleRaw from '!raw-loader!../../tocco-ui/src/SignalBox/example'

import PopoverRaw from '!raw-loader!../../tocco-ui/src/Popover/Popover'
import PopoverExample from '../../tocco-ui/src/Popover/example'
import PopoverExampleRaw from '!raw-loader!../../tocco-ui/src/Popover/example'

import SignalListRaw from '!raw-loader!../../tocco-ui/src/SignalList/SignalList'
import SignalListExample from '../../tocco-ui/src/SignalList/example'
import SignalListExampleRaw from '!raw-loader!../../tocco-ui/src/SignalList/example'

import TableRaw from '!raw-loader!../../tocco-ui/src/Table/Table'
import TableExample from '../../tocco-ui/src/Table/example'
import TableExampleRaw from '!raw-loader!../../tocco-ui/src/Table/example'

import TypographyRaw from '!raw-loader!../../tocco-ui/src/Typography/Typography'
import TypographyExample from '../../tocco-ui/src/Typography/example'
import TypographyExampleRaw from '!raw-loader!../../tocco-ui/src/Typography/example'

import UploadRaw from '!raw-loader!../../tocco-ui/src/Upload/Upload'
import UploadExample from '../../tocco-ui/src/Upload/example'
import UploadExampleRaw from '!raw-loader!../../tocco-ui/src/Upload/example'

const categories = {
  DISPLAY_DATA: 'Display Data',
  EDIT_DATA: 'Edit Data',
  LAYOUT: 'Layout',
  MESSAGE: 'Message',
  NAVIGATION: 'Navigation',
  TOCCO: 'Tocco Specific'
}

export default [{
  category: categories.DISPLAY_DATA,
  components: [{
    name: 'FormattedValue',
    raw: FormattedValueRaw,
    example: {
      component: FormattedValueExample,
      raw: FormattedValueExampleRaw
    }
  }, {
    name: 'Preview',
    raw: PreviewRaw,
    example: {
      component: PreviewExample,
      raw: PreviewExampleRaw
    }
  }, {
    name: 'Typography',
    raw: TypographyRaw,
    example: {
      component: TypographyExample,
      raw: TypographyExampleRaw
    }
  }, {
    name: 'Icon',
    raw: IconRaw,
    example: {
      component: IconExample,
      raw: IconExampleRaw
    }
  }, {
    name: 'Table',
    raw: TableRaw,
    example: {
      component: TableExample,
      raw: TableExampleRaw
    }
  }]
}, {
  category: categories.EDIT_DATA,
  components: [{
    name: 'EditableValue',
    raw: EditableValueRaw,
    example: {
      component: EditableValueExample,
      raw: EditableValueExampleRaw
    }
  }, {
    name: 'FormField',
    raw: FormFieldRaw,
    example: {
      component: FormFieldExample,
      raw: FormFieldExampleRaw
    }
  }, {
    name: 'Upload',
    raw: UploadRaw,
    example: {
      component: UploadExample,
      raw: UploadExampleRaw
    }
  }]
}, {
  category: categories.NAVIGATION,
  components: [{
    name: 'Link',
    raw: LinkRaw,
    example: {
      component: LinkExample,
      raw: LinkExampleRaw
    }
  }, {
    name: 'Button',
    raw: ButtonRaw,
    example: {
      component: ButtonExample,
      raw: ButtonExampleRaw
    }
  }, {
    name: 'ButtonLink',
    raw: ButtonLinkRaw,
    example: {
      component: ButtonLinkExample,
      raw: ButtonLinkExampleRaw
    }
  }, {
    name: 'ButtonGroup',
    raw: ButtonGroupRaw,
    example: {
      component: ButtonGroupExample,
      raw: ButtonGroupExampleRaw
    }
  }, {
    name: 'Menu',
    raw: MenuRaw,
    example: {
      component: MenuExample,
      raw: MenuExampleRaw
    }
  }, {
    name: 'SearchBox',
    raw: SearchBoxRaw,
    example: {
      component: SearchBoxExample,
      raw: SearchBoxExampleRaw
    }
  }, {
    name: 'Pagination',
    raw: PaginationRaw,
    example: {
      component: PaginationExample,
      raw: PaginationExampleRaw
    }
  }]
}, {
  category: categories.LAYOUT,
  components: [{
    name: 'Panel',
    raw: PanelRaw,
    example: {
      component: PanelExample,
      raw: PanelExampleRaw
    }
  }, {
    name: 'Box Layouts',
    raw: LayoutBoxRaw,
    example: {
      component: LayoutBoxExample,
      raw: LayoutBoxExampleRaw
    }
  }, {
    name: 'LoadMask',
    raw: LoadMaskRaw,
    example: {
      component: LoadMaskExample,
      raw: LoadMaskExampleRaw
    }
  }]
}, {
  category: categories.MESSAGE,
  components: [{
    name: 'Popover',
    raw: PopoverRaw,
    example: {
      component: PopoverExample,
      raw: PopoverExampleRaw
    }
  },
  {
    name: 'SignalList',
    raw: SignalListRaw,
    example: {
      component: SignalListExample,
      raw: SignalListExampleRaw
    }
  }, {
    name: 'SignalBox',
    raw: SignalBoxRaw,
    example: {
      component: SignalBoxExample,
      raw: SignalBoxExampleRaw
    }
  }, {
    name: 'Notifications',
    description: 'To show various notifications to the user',
    example: {
      component: NotifierExample,
      raw: NotifierExampleRaw
    }
  }, {
    name: 'Error Logging',
    description: 'Example to log Errors in an application',
    example: {
      component: ErrorLoggingExample,
      raw: ErrorLoggingExampleRaw
    }
  }]
}, {
  category: categories.TOCCO,
  components: [{
    name: 'Tocco Logo',
    raw: IconToccoRaw,
    example: {
      component: IconToccoExample,
      raw: IconToccoExampleRaw
    }
  }]
}]
