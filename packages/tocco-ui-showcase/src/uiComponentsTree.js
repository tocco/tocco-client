import ToccoLogoRaw from '!raw!../../tocco-ui/src/ToccoLogo/ToccoLogo'
import ToccoLogoExample from '../../tocco-ui/src/ToccoLogo/example'
import ToccoLogoExampleRaw from '!raw!../../tocco-ui/src/ToccoLogo/example'

import ButtonRaw from '!raw!../../tocco-ui/src/Button/Button'
import ButtonExample from '../../tocco-ui/src/Button/example'
import ButtonExampleRaw from '!raw!../../tocco-ui/src/Button/example'

import LoadMaskRaw from '!raw!../../tocco-ui/src/LoadMask/LoadMask'
import LoadMaskExample from '../../tocco-ui/src/LoadMask/example'
import LoadMaskExampleRaw from '!raw!../../tocco-ui/src/LoadMask/example'

import PaginationRaw from '!raw!../../tocco-ui/src/Pagination/Pagination'
import PaginationExample from '../../tocco-ui/src/Pagination/example'
import PaginationExampleRaw from '!raw!../../tocco-ui/src/Pagination/example'

const categories = {
  CORPORATE_IDENTITY: 'Corporate identity',
  FORMS: 'From Controls',
  LAYOUT: 'Layout'
}

export default [
  {
    category: categories.FORMS,
    components: [
      {
        name: 'Pagination',
        raw: PaginationRaw,
        example: {
          component: PaginationExample,
          raw: PaginationExampleRaw
        }
      },
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
      },
      {
        name: 'ToccoLogo1',
        raw: ToccoLogoRaw,
        example: {
          component: ToccoLogoExample,
          raw: ToccoLogoExampleRaw
        }
      }
    ]
  },
  {
    category: categories.LAYOUT,
    components: [
      {
        name: 'LoadMask',
        raw: LoadMaskRaw,
        example: {
          component: LoadMaskExample,
          raw: LoadMaskExampleRaw
        }
      }
    ]
  }
]
