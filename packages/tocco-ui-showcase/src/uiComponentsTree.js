import TableRaw from '!raw!../../tocco-ui/src/Table/Table'
import TableExample from '../../tocco-ui/src/Table/example'
import TableExampleRaw from '!raw!../../tocco-ui/src/Table/example'

import LoadMaskRaw from '!raw!../../tocco-ui/src/LoadMask/LoadMask'
import LoadMaskExample from '../../tocco-ui/src/LoadMask/example'
import LoadMaskExampleRaw from '!raw!../../tocco-ui/src/LoadMask/example'

import ButtonRaw from '!raw!../../tocco-ui/src/Button/Button'
import ButtonExample from '../../tocco-ui/src/Button/example'
import ButtonExampleRaw from '!raw!../../tocco-ui/src/Button/example'

import ToccoLogoRaw from '!raw!../../tocco-ui/src/ToccoLogo/ToccoLogo'
import ToccoLogoExample from '../../tocco-ui/src/ToccoLogo/example'
import ToccoLogoExampleRaw from '!raw!../../tocco-ui/src/ToccoLogo/example'

const categories = {
  CONTENT: 'Content',
  FORMS: 'From Controls',
  CORPORATE_IDENTITY: 'Corporate identity'
}

export default [
  {
    category: categories.CONTENT,
    components: [
      {
        name: 'Table',
        raw: TableRaw,
        example: {
          component: TableExample,
          raw: TableExampleRaw
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
      }]
  },
  {
    category: categories.CORPORATE_IDENTITY,
    components: [
      {
        name: 'ToccoLogo',
        raw: ToccoLogoRaw,
        example: {
          component: ToccoLogoExample,
          raw: ToccoLogoExampleRaw
        }
      }
    ]
  }
]
